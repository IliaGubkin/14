import { loadDetailedPage, loadHomePage } from './loadResource.js';
import { filmNumber } from './constants.js';

const navigate = (filmNumber) => {
  if (filmNumber) {
    loadDetailedPage('./pages/detailed.js');
  } else {
    loadHomePage('./pages/home.js');
  }
};

navigate(filmNumber);

window.addEventListener('popstate', () => {
  const searchParams = new URLSearchParams(location.search);
  const filmNumber = searchParams.get('filmNumber');

  navigate(filmNumber);
});
