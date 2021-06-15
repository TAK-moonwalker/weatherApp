const request = require('request');

const forecast = (lat, lon, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=b4f6e6558888a53298564d46c448b7ba&query=${lat},${lon}&units=m`;
request({url, json: true}, (error, {body})=>{
    if(error){
        callback('Couldn t connect weather API', undefined);
    }else if(body.success === false){
callback(body.error.info, undefined)
    }else{
const responseData = `Address : ${body.location.name} --- weather : ${body.current.weather_descriptions[0]}, temperature : ${body.current.temperature}°C, humidity : ${body.current.humidity}%`
   callback(undefined, responseData);
    }
})

}

module.exports = forecast