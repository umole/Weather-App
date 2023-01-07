const express = require("express");
const { write } = require("fs");
const https = require('https');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
   res.sendFile(__dirname + "/index.html");
    
});

app.post('/', (req, res) => {
    const CITY_ID = 2234402; // Lagos, Nigeria
    const API_KEY = "6ca92c89e79c61f4bed2675936ad2bcb";
    const CITY_NAME = req.body.city;
    const UNIT = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=${UNIT}`;

    axios.get(url)
        .then((response) => {
            const weatherData = (response.data.main.temp).toFixed(1) //.weather[0].description;
            const rawWeatherDataIcon = response.data.weather[0].icon;
            const weatherImage = `http://openweathermap.org/img/wn/${rawWeatherDataIcon}@2x.png`
            res.send(`
           <h1>The weather temperature in ${CITY_NAME} is: ${weatherData} degree celcius</h1>
           <img src="${weatherImage}">
           `);
    })
        .catch((error) => {
            console.error(error);
            res.status(500).send({error: 'Something went wrong'});
    });

})


app.listen(3000, () => {
    console.log("Server is listening on PORT: 3000");
});