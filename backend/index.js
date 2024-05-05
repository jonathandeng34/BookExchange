// This file will contain all the endpoints

import constants from './constants.js'
import express from 'express'

//const express = require('express')
console.log(constants)
const app = express()

app.get('/test', (req, res) => {
    res.json({
        "test": [1, 2, "three", 4, "five"]
    })
});

// Tell the app to start listening for API calls
app.listen(constants['port'], () => {
    console.log("Server started on port " + constants['port']);
})