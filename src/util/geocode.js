const request = require('request');


const geoCode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFrYWhpcm9tIiwiYSI6ImNrcDRia2FlODAxbGkyd3NidmRsOHVjdGEifQ.6UWgjS42APmKb6SXmjHv4A&limit=1`
    request({url, json:true}, (error, { body })=>{
    if(error){
    callback("Couldn't find geocoding API", undefined);
    }else if(body.features.length === 0){
    callback("Could not find location, try another search", undefined)
    }else{
        const returnData = {
            name: body.features[0].text,
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0]
        }
    callback(undefined, returnData);
    }
    })
    }

    module.exports = geoCode