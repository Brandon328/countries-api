// Styles
import './style.css';

// Web components
import './js/components/country-card';
import './js/components/country-tag';
import './js/components/country-detail';
import 'dark-mode-toggle';
import './js/router/router';

// Utils
import { getCountries } from './js/utils/requestapi';

window.addEventListener('DOMContentLoaded', getCountries, false);