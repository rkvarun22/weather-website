const request = require('request');

//WeatherStack for forecast
const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=aec9488284b9e13869b33df8ca14d833&query=' + latitude + ',' +longitude + '&units=m'

request({ url, json:true }, (error, {body}) => {
    if (error) {
        callback('Unable to connect to the weather service!', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + ', It is Currently ' + body.current.temperature +  ' degrees out, ' +  ' It feels like ' + body.current.precip + '% chance of rain. '  +  ' The humidity is ' + body.current.humidity)
    }

    })
}

module.exports = forecast