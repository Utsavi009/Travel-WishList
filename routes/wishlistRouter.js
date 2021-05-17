const express = require("express");
const wishlistRouter = require('express').Router();
wishlistRouter.use(express.json());

const countries = require("./countryList");


wishlistRouter.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<div><h1>Home Page</h1><a href='/api/countries'>Country List</a></div>`
    );
});

wishlistRouter.get("/api/countries", (req, res) => {
  const empty = [];
  for (let i = 0; i < countries.length; i++) {
    empty.push(countries[i].name);
  }
  let myHTML = "<ul>";
  for (let j = 0; j < empty.length; j++) {
    myHTML += `
            <li>${empty[j]}</li>
        `;
  }
  myHTML += "</ul>";
  res.send(`The List of the countries are : ${myHTML}`);
});

wishlistRouter.post("/api/countries", (req, res) => {
  const country = {
    id: countries.length + 1,
    name: req.body.name,
    alpha2Code: req.body.alpha2Code,
    alpha3Code: req.body.alpha3Code,
  };
  if (countries.map((e) => e.name).includes(req.body.name)) {
    return res.status(400).send({ error: "already exist!" });
  }
  if (countries.map((e) => e.alpha2Code).includes(req.body.alpha2Code)) {
    return res.status(400).send({ error: "already exist!" });
  }
  if (countries.map((e) => e.alpha3Code).includes(req.body.alpha3Code)) {
    return res.status(400).send({ error: "already exist!" });
  }
  countries.push(country);

  res.send(countries);
});

wishlistRouter.get("/api/countries/:code", (req, res) => {
  let { code } = req.params;
  const country = countries.find((e) => e.alpha2Code === code);
  if (countries.map((e) => e.alpha2Code).includes(code)) {
    res.send(country)
  }
  else {
    return res.status(400).send({ error: "Not exist!" });
  }
  
});

wishlistRouter.put("/api/countries/:code", (req, res) => {
  let { code } = req.params;
  const country = countries.find((e) => e.alpha2Code === code);
  if (countries.map((e) => e.alpha2Code).includes(code)) {
    country.name = req.body.name;
    country.alpha2Code = req.body.alpha2Code;
    country.alpha3Code = req.body.alpha3Code;
    res.send(country)
  }
  else {
    return res.status(400).send({ error: "Not exist!" });
  }
});

wishlistRouter.delete("/api/countries/:code", (req, res) => {
  let { code } = req.params;
  const country = countries.find((e) => e.alpha2Code === code);
  const index = countries.indexOf(country);
  countries.splice(index, 1);
  res.send(`${country.name} has been deleted`);
});

module.exports= wishlistRouter;
