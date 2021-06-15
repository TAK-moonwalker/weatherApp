const request = require('request');

const forecast = (lat, lon, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=b4f6e6558888a53298564d46c448b7ba&query=${lat},${lon}&units=m`;
request({url, json: true}, (error, {body})=>{
    if(error){
        callback('Couldn t connect weather API', undefined);
    }else if(body.success === false){
callback(body.error.info, undefined)
    }else{
const responseData = `${body.location.name} : ${body.current.weather_descriptions[0]}, It is ${body.current.temperature} outside and you might feel ${body.current.feelslike}!`
   callback(undefined, responseData);
    }
})

}

module.exports = forecast