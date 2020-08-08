const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apikey = "f810582fd4eaafe729698cea9d1f62b6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            res.write("<h1>Temp. in " + query + " is " + temp + " degree Celsius</h1>");
            res.write("<p>The weather here currently is " + weatherdata.weather[0].description + "</p>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        });

    });


})
 
    

app.listen(3006, function () {
    console.log("hello world");
});