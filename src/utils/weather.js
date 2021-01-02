const request = require('postman-request');

const weather = (city, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f484996faa76aefa1961eadd1111ad1a&query=' + encodeURIComponent(city);
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error){
            callback('Unable to find location', body.error)
        } else {
            callback(error, body.current)
        }
    });
}

module.exports = weather