import { countriesGallery, countryDetailContainer } from './nodes';
const API_URL = 'https://restcountries.com/v3.1';

// Utils
async function fetchData(endpoint) {
  const response = await fetch(API_URL + endpoint);
  const data = await response.json();
  return data;
}
function getPopulationString(population) {
  const strPopulation = population.toString();
  const size = strPopulation.length;
  const arrPopulation = [];
  for (let index = 1; index <= size; index++) {
    if (index % 3 == 0) {
      arrPopulation.unshift(strPopulation.slice(size - index, size - index + 3));
    }
    else if (index == size) {
      arrPopulation.unshift(strPopulation.slice(0, size % 3));
    }
  }
  return arrPopulation.join(',');
}
async function getBorderCountriesName(codes) {
  const countries = await fetchData(`/alpha?codes=${codes.join(',')}&fields=name`);
  return countries.map(country => country.name.common).join(',');
}
function printCountries(countries) {
  countriesGallery.innerHTML = '';
  const countriesList = [];
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  countries.forEach(country => {
    const countryCard = document.createElement('country-card');
    countryCard.flag = country.flags.svg ?? country.flags.png;
    countryCard.name = country.name.common;
    countryCard.population = getPopulationString(country.population);
    countryCard.region = country.region;
    countryCard.capital = country.capital.join(', ');
    countriesList.push(countryCard);
  });
  countriesGallery.append(...countriesList);
}

// API Requests
async function getCountries() {
  const countries = await fetchData('/all?fields=name,capital,region,population,flags');
  printCountries(countries);
}
async function getCountry(countryName) {
  //If country does not exit, show 404 error - country not found;
  countryDetailContainer.innerHTML = '';
  const [country] = await fetchData(`/name/${countryName}?fields=name,capital,region,subregion,languages,flags,population,borders,currencies,tld`);
  const countryDetail = document.createElement('country-detail');
  countryDetail.flag = country.flags.svg ?? country.flags.png;
  countryDetail.name = country.name.common;
  countryDetail.native_name = country.name.official;
  countryDetail.population = getPopulationString(country.population);
  countryDetail.region = country.region;
  countryDetail.subregion = country.subregion;
  countryDetail.capital = country.capital.join(', ');
  countryDetail.domain = country.tld.join(', ');
  countryDetail.currencies = Object.values(country.currencies).map(curr => curr.name).join(', ');
  countryDetail.languages = Object.values(country.languages).join(', ');
  if (country.borders)
    countryDetail.border_countries = await getBorderCountriesName(country.borders);
  else
    countryDetail.border_countries = '';
  countryDetailContainer.appendChild(countryDetail);
}
async function getCountryBySearch(input) {
  const input_decoded = decodeURI(input);
  const countries = await fetchData(`/name/${input}?fields=name,capital,region,population,flags`);
  console.log(countries);
  //if there is no countries show a 404 error.
  printCountries(countries);
}

export { getCountries, getCountry, getCountryBySearch };