import { countriesGallery, countryDetailContainer } from './nodes';
const API_URL = 'https://restcountries.com/v3.1';
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

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

const getCountries = async function () {
  countriesGallery.innerHTML = '';
  const countries = await fetchData('/all?fields=name,capital,region,population,flags');
  const countriesList = [];
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  countries.forEach(country => {
    const countryCard = document.createElement('country-card');
    countryCard.flag = country.flags.svg ?? country.flags.png;
    countryCard.name = country.name.common;
    countryCard.population = getPopulationString(country.population);
    countryCard.region = country.region;
    countryCard.capital = country.capital[0];
    countriesList.push(countryCard);
  });
  countriesGallery.append(...countriesList);
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
  countryDetail.capital = country.capital[0];
  countryDetail.domain = country.tld[0];
  countryDetail.currencies = Object.values(country.currencies).map(curr => curr.name).join(', ');
  countryDetail.languages = Object.values(country.languages).join(', ');
  countryDetail.border_countries = country.borders.join(',');
  countryDetailContainer.appendChild(countryDetail);
}

export { getCountries, getCountry };