const path = require('path')
const express = require('express');
const { isAbsolute } = require('path');
const hbs = require('hbs');

const geoCode = require('./util/geocode.js');
const forecast = require('./util/forecast.js');

const app = express();

// define path for Express config
pathToPublic = path.join(__dirname, '../public');
viewsPath = path.join(__dirname, '../web/views');
partialsPath = path.join(__dirname, '../web/partials');

// set up handlebars engine and path to root/views location
app.set('view engine', 'hbs'); //handlebars set-up
app.set('views', viewsPath); // viwes directory path set-up
hbs.registerPartials(partialsPath); // partials directory set-up

// set up static directory for serve
app.use(express.static(pathToPublic));


//app.set('views', path.join(__dirname, '../views'));

app.get('', (req, res)=>{
res.render('index', {
    title: 'Weather app',
    name: 'Tak'
})
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Tak'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
title: 'Help page',
description: 'Please ask anything',
name:"Tak"
    })
})

// routing address
// app.com
// app.com/help
// app.com/about
// app.com/weather *send back Json with quesry request from browser
// app.com/products *send back json with query

// app.get('/weather', (req, res)=>{
//     if(!req.query.location){
// return res.send({
//     error: 'You need to provide your address!'
// });
//     }

    
// res.send({
//     location : "Osaka",
//     address: req.query.location,
//     Weatherforcase : {
//         weather : 'sunny',
//         temparature: 30,
//         wind: 'strong'
//     }
// });
// })

app.get('/weather', (req, res)=>{
    if(!req.query.location){
return res.send({
    error: 'You need to provide your address!'
});
    }else{
        geoCode(req.query.location, (error, { latitude, longitude, name} = {})=>{
          if(error){
            return res.send({error});
          }
        forecast(latitude, longitude, (error, forecastData) => {
        
          if(error){
            return res.send({error});
          }

          res.send({
            location : req.query.location,
            address: name,
            Weatherforcase : forecastData
        });
        // console.log(name);
        // console.log(forecastData);
        })
        
        })
      }

    
// res.send({
//     location : "Osaka",
//     address: req.query.location,
//     Weatherforcase : {
//         weather : 'sunny',
//         temparature: 30,
//         wind: 'strong'
//     }
// });
})

app.get('/products', (req, res)=>{
    // console.log(req.query.search);
    if(!req.query.search){
    return res.send({
    error: 'You need to provide term for search!'
    })
}
res.send({
    products: []
})
})

app.get('/help/*', (req, res)=>{
res.render('404', {
    title: 404,
    name: "Sexy Mandarin 2021",
    message: 'Help page not Found!',
});
})

app.get('*', (req, res)=>{
res.render('404', {
    title: 404,
    name: "Sexy Mandarin 2021",
    message: '404 NOT FOUND!',
});
});



app.listen(3000, ()=>{
    console.log("server is running on port:3000");
});