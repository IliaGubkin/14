import { container, filmNumber } from '../constants.js';
import { loadHomePage, loadResource, loadResources } from '../loadResource.js';

const createDetailedList = (data, ul) => {
  data.forEach(elem => {
    const li = document.createElement('li');
    li.innerText = elem.name;
    ul.append(li);
  });
};

export const createDetailedPage = async (films, film) => {
  loadResource('./filmsApp/style.css');
  container.innerHTML = '';
  let currentFilm = film;

  if (!film) {
    currentFilm = await loadResource(`https://swapi.dev/api/films/${filmNumber}`);
  }

  const backButton = document.createElement('button');
  const h1 = document.createElement('h1');
  const description = document.createElement('p');
  const planetsTitle = document.createElement('h2');
  const speciesTitle = document.createElement('h2');
  const planetsList = document.createElement('ul');
  const speciesList = document.createElement('ul');
  const { planets, species } = await loadResources(
    {
      planets: currentFilm.planets,
      species: currentFilm.species
    }
  );

  backButton.innerText = 'Back to episodes';
  backButton.addEventListener('click', () => {
    history.pushState(null, '', '/');
    loadHomePage('./pages/home.js', films);
  });
  backButton.classList.add('btn');

  createDetailedList(planets, planetsList);
  createDetailedList(species, speciesList);

  h1.innerText = currentFilm.title;
  planetsTitle.innerText = 'Planets';
  speciesTitle.innerText = 'Species';
  description.innerText = currentFilm.opening_crawl;

  container.append(backButton);
  container.append(h1);
  container.append(description);
  container.append(planetsTitle);
  container.append(planetsList);
  container.append(speciesTitle);
  container.append(speciesList);
};
