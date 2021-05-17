const express = require("express");

const app = express();
app.use(express.json());
const validator = require('validator');

const countries = require('./countryList');
const PORT = 3000;


app.get('/', (req, res) => {
    res.status(200).send(`<div><h1>Home Page</h1><a href='/api/countries'>Country List</a></div>`);
});

app.get('/api/countries', (req, res) => {
    const empty = [];
    for(let i = 0; i < countries.length; i++) {
        empty.push(countries[i].name);
    }
    let myHTML = "<ul>";
    for(let j = 0; j < empty.length; j++){
        myHTML += `
            <li>${empty[j]}</li>
        `;
    }
    myHTML += "</ul>";
    res.send(`The List of the countries are : ${myHTML}`);
})

app.post('/api/countries', (req, res) => {
    const country = {
        id: countries.length+1,
        name: req.body.name,
        alpha2Code: req.body.alpha2Code,
        alpha3Code: req.body.alpha3Code
    }
    countries.push(country);
    res.send(countries);
})

app.get('/api/countries/:code', (req, res) => {
    let { code } = req.params
    const country = countries.find(e=> e.alpha2Code === code);
    res.send(country);
})

app.put('/api/countries/:code', (req, res) => {
    
    let { code } = req.params
    const country = countries.find(e=> e.alpha2Code === code);
    country.name = req.body.name;
    country.alpha2Code = req.body.alpha2Code;
    country.alpha3Code = req.body.alpha3Code;
    res.send(country);
})



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
