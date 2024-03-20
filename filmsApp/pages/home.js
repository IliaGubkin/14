import { loadDetailedPage, loadResource } from '../loadResource.js';
import { filmList, container } from '../constants.js';

export const createHomePage = async (films) => {
  loadResource('./filmsApp/style.css');
  let currentFilms = films;
  if (!films) {
    currentFilms = await loadResource('https://swapi.dev/api/films');
  }
  container.innerHTML = '';

  currentFilms.results.forEach((film, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.innerText = film.episode_id + ' ' + film.title;

    a.addEventListener('click', (event) => {
      event.preventDefault();

      history.pushState(null, '', `?filmNumber=${index + 1}`);

      loadDetailedPage('./pages/detailed.js', currentFilms, film);
    });
    li.classList.add('list');
    li.appendChild(a);
    filmList.appendChild(li);
    container.appendChild(li);
  });
};
