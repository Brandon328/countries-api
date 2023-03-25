import { countriesGallery, countryDetailContainer, btnRegions, btnBack } from '../utils/nodes';
import { filterByRegion, getCountries, getCountry, getCountryBySearch } from '../utils/requestapi';

const home = function () {
  countriesGallery.classList.remove('inactive');
  countryDetailContainer.classList.add('inactive');
  btnRegions.classList.remove('inactive');
  btnBack.classList.add('inactive');
}

const detail = function () {
  countriesGallery.classList.add('inactive');
  countryDetailContainer.classList.remove('inactive');
  btnRegions.classList.add('inactive');
  btnBack.classList.remove('inactive');
}

const search = function () {
  countriesGallery.classList.remove('inactive');
  countryDetailContainer.classList.add('inactive');
  btnRegions.classList.add('inactive');
  btnBack.classList.remove('inactive');
}

const filter = function () {
  countriesGallery.classList.remove('inactive');
  countryDetailContainer.classList.add('inactive');
  btnRegions.classList.remove('inactive');
  btnBack.classList.remove('inactive');
}

var routes = {
  '/': [home, getCountries],
  '/detail/:countryName': [detail, getCountry],
  '/search/:input': [search, getCountryBySearch],
  '/filter/:region': [filter, filterByRegion]
  // '/books/view/:bookId': viewBook
};
export default routes;

