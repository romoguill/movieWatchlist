import getData from './api-interface.js';
import { renderMovies } from './render.js';

const formElement = document.querySelector('form');

const addToWatchlistBtnFunctionality = () => {
  const addToWathclistBtnElements = document.querySelectorAll('.btn-watchlist');
  addToWathclistBtnElements.forEach((btn) => {
    btn.addEventListener('click', addToWatchlist);
  });
};

const addToWatchlist = (e) => {
  const imdbId = e.target.closest('[data-imdbid]').dataset.imdbid;
  if (!watchlist.includes(imdbId)) {
    watchlist.push(imdbId);
  }

  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Listen for a title search, search for the data and render it
formElement.addEventListener('submit', async (e) => {
  const formData = new FormData(formElement);
  const titleSearched = formData.get('title');

  // Call to API and store the returned object
  const moviesData = await getData(titleSearched);

  // Insert HTML template to create movies card
  renderMovies(moviesData);

  // Give functionality to the watchlist button
  addToWatchlistBtnFunctionality();
});
