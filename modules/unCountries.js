const countryData = require("../data/countryData");
const regionData = require("../data/regionData");

let countries = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      const countries = countryData.map((country) => {
        const region = regionData.find((r) => r.id === country.regionid);
        
        if (!region) {
          const error = new Error('Region with ID ${country.regionid} not found for country ${country.name}');
          reject(error);
        }

        return { ...country, region };
      });

      resolve(countries);
    } catch (error) {
      reject(error);
    }
  });
}


// Call initialize function when the module is imported
initialize();

function getAllCountries() {
  return new Promise((resolve, reject) => {
    if (countries.length > 0) {
    resolve(countries);
    } else { reject('Ensure that the initialize function has been executed to retrieve countries data.')
   }
  });
}

function getCountryByCode(countryCode) {
  return new Promise((resolve, reject) => {
    const Country = countries.find(country => country.a2code.toLowerCase() === countryCode.toLowerCase());
    if (country) {
      resolve(country);
    } else {
      reject('Unable to find the requested country..');
    }
  });
}

function getCountriesByRegion(region) {
  return new Promise((resolve, reject) => {
    const foundCountries = countries.filter((country) =>
      country.region.name.toLowerCase().includes(region.toLowerCase())
    );

    if (foundCountries.length > 0) {
      resolve(foundCountries);
    } else {
      reject("Unable to find countries in the requested region.");
    }
  });
}

module.exports = {
  initialize,
  getAllCountries,
  getCountryByCode,
  getCountriesByRegion,
};
