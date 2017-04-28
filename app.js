const https = require('https');
const http = require('http');

function showWeather(city, temp, description) {
    const message = `The temperature in ${city} is ${temp} degrees. The forecast calls for ${description}`;
    console.log(message);
}

function getWeather(zipcode) {
    try {
	    
        const request = http.get(`http://samples.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=b2297681910972a2d7aa669cc537e54d`, (res) => {
            console.log(res.statusCode);
            let body = "";

            res.on('data', (data) => {
                body += data.toString();
            });

            res.on('end', () => {
                const weather = JSON.parse(body);
                showWeather(weather.name, weather.main.temp, weather.weather[0].description);
            });
        });

        request.on('error', error => console.error(`Problem with message ${error.message}`));

    } catch (error) {
        console.log(error);
    }
}
getWeather(37206);
