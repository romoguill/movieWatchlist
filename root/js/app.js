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
  const imdbId = e.target.dataset.imdbid;
};

const watchlist = localStorage.getItem('storedMovies') || [];

// Listen for a title search, search for the data and render it
formElement.addEventListener('submit', async (e) => {
  const formData = new FormData(formElement);
  const titleSearched = formData.get('title');

  const moviesData = await getData(titleSearched);
  renderMovies(moviesData);
  addToWatchlistBtnFunctionality();
});
