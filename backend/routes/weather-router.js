// import express module
const express = require('express');
// import axios
const axios = require('axios')
const router=express.Router();
router.post("/", (req, res) => {
    console.log("Here into BL : display city ", req.body);
    let key = "f12440484e2b992b14304b88e07bfe03";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.adresse}&appid=${key}`;
    console.log("here url", apiURL)
    axios.get(apiURL).then((response) => {

        console.log("here response from API", response);

        let data = {
            temperature: response.data.main.temp,
            pression: response.data.main.pressure,
            humidity: response.data.main.humidity,
            icon:`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png` 
        }
        console.log("here response from API", data);
        res.json({weather: data });
    });


});
module.exports=router;