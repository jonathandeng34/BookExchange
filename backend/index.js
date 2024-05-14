// This file will contain all the endpoints

import constants from './constants.js'
import express from 'express'
import fs from 'fs'
//const express = require('express')
import connectDB from './config/db.js'
//const fs = require('fs');
console.log(constants)
const app = express()
let users = JSON.parse(fs.readFileSync('./data/users.json'));
let emails = JSON.parse(fs.readFileSync('./data/emailconfirmation.json'))

app.use(express.json())

app.get('/test', (req, res) => {
    res.json({
        "test": [1, 2, "three", 4, "five"]
    })
});

app.get('/register', (req, res) => {
    res.json({
        status: "success or fail"
        //also send confirmation email
    })
});

app.post('/register', (req, res) => {
   // console.log(req.body);
    const newId = users[users.length-1].id+1;
    const newUser = Object.assign({id: newId}, req.body);
    users.push(newUser);
    fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
        res.status(201).json({
            status: "success"
        })
    });
});


app.get('/forgotpassword', (req, res) => {
    res.json()
});
app.post('/forgotpassword', (req, res) => {
     const newId = emails[emails.length-1].id+1;
     const newEmail = Object.assign({id: newId}, req.body);
     emails.push(newEmail);
     fs.writeFile('./data/emailconfirmation.json', JSON.stringify(emails), (err) => {
         res.status(201).json({
             status: "success"
         })
     });
 });

 app.get('/getuser/:id', (req, res) => {
    const id = req.params.id;
    // const user = {
    //     id: 1,
    //     username: "blah balh",
    // }
    const user = users[0];
    res.send({
        user: user,
    });
});

app.get('/getbook', (req, res) => {
    res.json()
});


app.get('/getbookexchanges', (req, res) => {
    res.json()
});

connectDB().then(() => {
    // Tell the app to start listening for API calls
    app.listen(constants['port'], () => {
        console.log("Server started on port " + constants['port']);
    })
});

