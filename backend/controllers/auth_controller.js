import mongoose from 'mongoose'
import express from 'express'
import User from '../db_models/user_model.js';
import sendMail from '../config/email_service.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


import validateSchema, { validateID } from '../frontend_models/validate_schema.js';
import { LoginSchema, RegisterSchema, ForgotPasswordSchema, ChangePasswordSchema } from '../frontend_models/auth_schemas.js';

import ForgotPasswordModel from '../db_models/forgotpass_model.js';

const router = express.Router();

/**
 * Expected JSON:
 * Email
 * Username
 * Password
 */
router.post('/register', validateSchema(RegisterSchema), async (req, res) => {
    //Make sure the given email is a g.ucla.edu email

    let domainName = req.body.email.split('@')[1];
    if(domainName != "g.ucla.edu" && domainName != "ucla.edu") {
        res.status(400);
        res.json({
            "reason": "Invalid Email. Please use a valid UCLA address"
        });
        return;
    }

    //Make sure the given email doesn't already exist in the database

    try {
        let users = await User.find({
            email: req.body.email
        });

    
        if(users.length != 0) {
            res.status(500);
            res.json({
                "reason": "Account already exists with the given email"
            });
            return;
        }
    
        users = await User.find({
            username: req.body.username
        });
    
        if(users.length != 0) {
            res.status(500);
            res.json({
                "reason": "Account already exists with the given username"
            });
            return;
        }
    }
    catch(e) {
        console.log(e);
        res.status(500);
        res.json({
            "reason": "Internal Server Error"
        });
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
            res.json({
                "reason": "Account Created Successfully"
            });
        });
    })
    .catch(e => {
        console.log(e);
        res.status(400);
        res.json({
            "reason": "Unable to Send Email Verification"
        });
    });

    //Email with verify


});

/**
 * Expected JSON:
 * Email
 * Password
 */
router.post('/login', validateSchema(LoginSchema), (req, res) => {
    //Find the user with the specified email
    //Hash the given password using BCrypt and then compare it with the stored encrypted password
    //If the passwords match, return a JWT Token with the specified user ID.

    console.log(req.body);

    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(!user) {
            res.status(404);
            res.json({
                "reason": "No User exists with the Given Email!"
            });
            return;
        }

        bcrypt.compare(req.body.password, user.password).then(result => {
            if(result) {
                let jwtToken = jwt.sign({
                    //time: new Date(),
                    expiresIn: "3d",
                    userId: user._id
                }, process.env.JWT_SECRET);
                res.cookie("jwt", jwtToken, {
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                });
                res.status(201);
                res.json({
                    "reason": "Login Success"
                });
            }
            else {
                res.status(400);
                res.json({
                    "reason": "Incorrect Password!"
                });
            }
        })
        
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.sendStatus(200);
});

/**
 * Expected JSON:
 * Email
 */
router.post('/forgotpassword/request', validateSchema(ForgotPasswordSchema), (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(!user) {
            res.status(404);
            res.json({
                "reason": "No User Exists with Given Email"
            });
            return;
        }
        let expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + parseInt(process.env.FORGOT_PASS_EXPIRATION_TIME_HOURS)*60*60*1000);
        let newForgotPassReq = new ForgotPasswordModel({
            userId: user._id,
            expirationDate: expirationDate
        });

        newForgotPassReq.save().then( doc => {
            sendMail(user.email, "UCLA Book Exchange: Password Reset Code", "Your Password Reset Code Is " + doc._id).then(info => {
                res.sendStatus(200);
            });
        }).catch(e => {res.sendStatus(500);});
    })
    .catch(e => {
        console.log(e);
        res.status(500);
        res.json({
            "reason": "Internal Server Error"
        });
    });
});

router.get('/forgotpassword/check_code/:id', validateID(), (req, res) => {

    ForgotPasswordModel.findById(req.params.id).then(forgotReq => {
        if(!forgotReq) {
            res.status(404);
            res.json({
                "reason": "Invalid Forgot Password Code"
            });
            return;
        }
        res.sendStatus(200);
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

/**JSON
 * Password
 */
router.post('/forgotpassword/change_password/:id', validateSchema(ChangePasswordSchema), validateID(), (req, res) => {

    ForgotPasswordModel.findById(req.params.id).then(forgotReq => {
        if(!forgotReq) {
            res.status(404);
            res.json({
                "reason": "Invalid Forgot Password Code"
            });
            return;
        }

        User.findOneAndUpdate(
            {_id: forgotReq.userId},
            {password: req.body.password}
        ).then(async (user) => {
            if(!user) {
                res.status(404);
                res.json({
                    "reason": "Problem Finding User to Update Password For"
                });
            }
            await ForgotPasswordModel.deleteOne({_id: forgotReq._id});
            res.sendStatus(200);
        }).catch(e => {
            console.log(e);
            res.sendStatus(500);
        });

    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export {router as AuthController};