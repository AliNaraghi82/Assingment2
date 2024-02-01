/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Ali Naraghi Student ID: 123747222 Date: Feb.1.2024
*
*  Online (Cyclic) Link: https://drab-crow-nightgown.cyclic.app
*
********************************************************************************/




const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, () => console.log('Server is up and running on port: ${HTTP_PORT}'));

app.get("/", (req, res) => res.send("Assignment 2: Ali Naraghi - 123747222"));

const unCountryData = require("./modules/unCountries");

app.get("/un/countries", (req, res) => {
  unCountryData.getAllCountries()
    .then(countries => {
      res.json(countries);
    })
    .catch(error => {
      console.error('Failed to fetch all countries:', error);
      res.status(500).send('Internal Server Error');
    });
});

unCountryData.initialize()
  .then(() => console.log('Initialization complete. Countries data successfully loaded.'))
  .catch(error => console.error('Error during initialization:', error));
  app.get("/un/countries", (req, res) => {
  });

app.get("/un/countries/code-demo", (req, res) => {
  const countryCode = 'ca';
});

  unCountryData.getCountryByCode(countryCode)
    .then(country => res.json(country))
    .catch(error => {
      console.error('Error fetching country with code ${countryCode}:', error);
      res.status(404).send(error);
});

app.get("/un/countries/region-demo", (req, res) => {
  const regionPart = 'oceania';

  unCountryData.getCountriesByRegion(regionPart)
    .then(countries => res.json(countries))
    .catch(error => {
      console.error('Error fetching countries for region ${regionPart}:', error);
      res.status(404).send(error);
  });
});
