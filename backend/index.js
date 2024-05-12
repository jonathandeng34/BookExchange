// This file will contain all the endpoints

import constants from './constants.js'
import express from 'express'

//const express = require('express')
console.log(constants)
const app = express()

app.use(express.json())

app.get('/test', (req, res) => {
    res.json({
        "test": [1, 2, "three", 4, "five"]
    })
});

// Tell the app to start listening for API calls
app.listen(constants['port'], () => {
    console.log("Server started on port " + constants['port']);
})

app.get('/register', (req, res) => {
    res.json({
        status: "success or fail"
        //also send confirmation email
    })
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Received user, pass, and email');
});