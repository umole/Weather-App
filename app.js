const express = require("express");
const { write } = require("fs");
const https = require('https');
const axios = require('axios');

const CITY_ID = 2234402; // Lagos, Nigeria
const API_KEY = "6ca92c89e79c61f4bed2675936ad2bcb";
const CITY_NAME = "Abeokuta";


const app = express();


app.get('/', (req, res) => {
   // res.send("Hello, you wanna check the weather update?");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

    axios.get(url)
        .then((response) => {
            const weatherData = response.data.weather[0].description;
            const rawWeatherDataIcon = response.data.weather[0].icon;
            res.write(`<h1>The weather description is: ${weatherData}</h1>`);
            const weatherImage = `http://openweathermap.org/img/wn/${rawWeatherDataIcon}@2x.png`
            res.write("<img src=" + weatherImage + ">");
            res.send();
    })
        .catch((error) => {
            console.error(error);
            res.status(500).send({error: 'Something went wrong'});
    });
});

app.listen(3000, () => {
    console.log("Server is listening on PORT: 3000");
});