const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup habdlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve 
app.use(express.static(publicDirectoryPath));

//Home Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'RK varun'
    })
});

//About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        name: 'RK Varun'
    })
});

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact us',
        name: 'RK Varun'
    })
});

//query input
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    //geocode request query
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        //forecast data and location
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
});

//page 404 error
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'RK Varun',
        errorMessage: 'Page 404 not found'
    })
});

//port setup
app.listen(port, () => {
    console.log('Server is running...' + port)
});