// Styles
import './style.css';

// Web components
import './js/components/country-card';
import './js/components/country-tag';
import './js/components/country-detail';
import './js/components/error-not-found';
import 'dark-mode-toggle';
import './js/router/router';

// Utils
import './js/utils/events';
import { getCountries } from './js/utils/requestapi';

window.addEventListener('DOMContentLoaded', getCountries, false);