import { countriesGallery, countryDetailContainer } from './nodes';
const API_URL = 'https://restcountries.com/v3.1';
const nodesCountries = `
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
`;
const nodeCountry = `
  <country-card class="country-card--loading"></country-card>
`;

// Observer
const options = {
  root: null,
};
const observer = new IntersectionObserver(callback, options);
function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const countryCard = entry.target;
      const countryFlag = countryCard.shadowRoot.querySelector('img');
      const flagSrc = countryCard.getAttribute('data-flag');
      countryFlag.setAttribute('src', flagSrc);
      observer.unobserve(entry.target); // buenas practicas
    }
  });
}

// Utils
async function fetchData(endpoint) {
  const response = await fetch(API_URL + endpoint);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    // console.clear();
    return 'error';
  }
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
    // countryCard.flag = country.flags.svg ?? country.flags.png;
    countryCard.setAttribute('data-flag', country.flags.svg ?? country.flags.png);
    countryCard.name = country.name.common;
    countryCard.population = getPopulationString(country.population);
    countryCard.region = country.region;
    countryCard.capital = country.capital == undefined ? 'Unknown' : country.capital[0];
    countriesList.push(countryCard);
    observer.observe(countryCard)
  });
  countriesGallery.append(...countriesList);
}
function printErrorNotFound(message, container) {
  countriesGallery.innerHTML = '';
  const notFoundPage = document.createElement('error-not-found');
  notFoundPage.message = message;
  container.appendChild(notFoundPage);
}
function loadingCountries() {
  countriesGallery.innerHTML = nodesCountries;
}

// API Requests
async function getCountries() {
  loadingCountries();
  const countries = await fetchData('/all?fields=name,capital,region,population,flags');
  if (countries !== 'error')
    printCountries(countries);
  else
    printErrorNotFound(
      `An error ocurred and your request couldn't be completed. Please try it again later.`,
      countriesGallery);
}
async function getCountry(countryName) {
  countryDetailContainer.innerHTML = '';
  const response = await fetchData(`/name/${countryName}?fields=name,capital,region,subregion,languages,flags,population,borders,currencies,tld`);
  if (response !== 'error') {
    const [country] = response;
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
    if (country.borders.length > 0)
      countryDetail.border_countries = await getBorderCountriesName(country.borders);
    else
      countryDetail.border_countries = '';
    countryDetailContainer.appendChild(countryDetail);
  }
  else
    printErrorNotFound(
      `The country <code> ${countryName}</code> was not found in our database.`,
      countryDetailContainer);
}
async function getCountryBySearch(input) {
  loadingCountries();
  const inputDecoded = decodeURI(input);
  const countries = await fetchData(`/name/${inputDecoded}?fields=name,capital,region,population,flags`);
  if (countries !== 'error')
    printCountries(countries);
  else
    printErrorNotFound(
      `The country <code> ${inputDecoded}</code> was not found in our database.`,
      countriesGallery);
}
async function filterByRegion(region) {
  loadingCountries();
  const countries = await fetchData(`/region/${region}`);
  if (countries !== 'error')
    printCountries(countries);
  else
    printErrorNotFound(
      `The region <code> ${region}</code> was not found in our database.`,
      countriesGallery);
}

export { getCountries, getCountry, getCountryBySearch, filterByRegion };