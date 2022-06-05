import { getDataFromSearch } from './api-interface.js';
import { renderMovies } from './render.js';

const formElement = document.querySelector('form');

// Get the imdbId from the html and add it to local storge if it isn't already there
const addToWatchlist = (e) => {
  const imdbId = e.target.closest('[data-imdbid]').dataset.imdbid;
  if (!watchlist.includes(imdbId)) {
    watchlist.push(imdbId);
  }

  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

// Loop over every watchlist button and add functionality to add movie to watchlist
const addToWatchlistBtnFunctionality = () => {
  const addToWathclistBtnElements = document.querySelectorAll('.btn-watchlist');
  addToWathclistBtnElements.forEach((btn) => {
    btn.addEventListener('click', addToWatchlist);
  });
};

// Store the watchlist in localStorage on a vaiable. If there isn't one create an empty array
const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Listen for a title search, search for the data and render it
formElement.addEventListener('submit', async (e) => {
  const formData = new FormData(formElement);
  const titleSearched = formData.get('title');

  // Call to API and store the returned object
  const moviesData = await getDataFromSearch(titleSearched);

  // Insert HTML template to create movies card
  renderMovies(moviesData, 'add');

  // Give functionality to the watchlist button
  addToWatchlistBtnFunctionality();
});
