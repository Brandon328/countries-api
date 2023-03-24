import { countriesGallery, countryDetailContainer, btnRegions, btnBack } from '../utils/nodes';
import { getCountries, getCountry, getCountryBySearch } from '../utils/requestapi';

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

var routes = {
  '/': [home, getCountries],
  '/detail/:countryName': [detail, getCountry],
  '/search/:input': [home, getCountryBySearch]
  // '/books/view/:bookId': viewBook
};
export default routes;

