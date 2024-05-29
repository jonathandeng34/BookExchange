import mongoose from 'mongoose'
import express from 'express'
import User from '../db_models/user_model.js';
import sendMail from '../config/email_service.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router();

/**
 * Expected JSON:
 * Email
 * Username
 * Password
 */
router.post('/register', async (req, res) => {
    //Make sure the given email is a g.ucla.edu email

    let domainName = req.body.email.split('@')[1];
    if(domainName != "g.ucla.edu" && domainName != "ucla.edu") {
        res.status(500);
        res.send("Invalid Email. Please use a valid UCLA address");
        return;
    }

    //Make sure the given email doesn't already exist in the database

    try {
        let users = await User.find({
            email: req.body.email
        });

    
        if(users.length != 0) {
            res.status(500);
            res.send("Account already exists with the given email");
            return;
        }
    
        users = await User.find({
            username: req.body.username
        });
    
        if(users.length != 0) {
            res.status(500);
            res.send("Account already exists with the given username");
            return;
        }
    }
    catch(e) {
        res.status(500);
        res.send("Internal Server Error");
        return;
    }

    //Save the new user into the database (the pre on UserSchema should automatically hash the password with bcrypt)

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userRating: 0
    });

    sendMail(req.body.email, "Account Being Created", "Your account will be created momentarily")
    .then((info) => {
        newUser.save().then(doc => {
            res.send("Account Created Successfully");
        });
    })
    .catch(e => {
        res.status(400);
        res.send("Unable to Send Email Verification");
    });

    //Email with verify


});

/**
 * Expected JSON:
 * Email
 * Password
 */
router.post('/login', (req, res) => {
    //Find the user with the specified email
    //Hash the given password using BCrypt and then compare it with the stored encrypted password
    //If the passwords match, return a JWT Token with the specified user ID.

    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(!user) {
            res.status(404);
            res.send("No User exists with the Given Email!");
            return;
        }

        bcrypt.compare(req.body.password, user.password).then(result => {
            if(result) {
                let jwtToken = jwt.sign({
                    time: new Date(),
                    userId: user._id
                }, process.env.JWT_SECRET);
                res.json(jwtToken);
            }
            else {
                res.status(401);
                res.send("Incorrect Password!");
            }
        })
        
    });
});

/**
 * Expected JSON:
 * Email
 */
router.post('/forgotpassword/request', (req, res) => {

});

router.post('/forgotpassword/check_code/:code', (req, res) => {

});

router.post('/forgotpassword/change_password/:code', (req, res) => {

});

export {router as AuthController};