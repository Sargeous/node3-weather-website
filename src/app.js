const path = require('path')
const express = require('express')
const hbs = require('hbs')

const weather = require('./utils/weather');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        creator: 'Husky'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        creator: 'Husky'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'We are here to help',
        creator: 'Husky'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'A city must be provided'
        })
    }
    weather(req.query.city, (error, {weather_descriptions: description, temperature, feelslike} = {}) => {
        if (error) {
            return res.send({error: error})
        }

        res.send({
            city: req.query.city,
            description: description[0],
            temperature: temperature,
            feelslike: feelslike
        })
    })
    
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: 'OOOOPS',
        msg: 'Seems that this page is not available',
        creator: 'Husky'
    })
})

app.listen(port, () => {
    console.log('Server up and running on port ' + port);
})