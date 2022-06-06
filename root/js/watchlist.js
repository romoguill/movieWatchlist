import { getDataFromWatchlist } from './api-interface.js';
import { renderMovies } from './render.js';

// Load the actual watchlist to a variable
const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Gets the data from the API, then renders it and finally add functionality to the remove btn
const loadAndRenderWatchlist = async () => {
  try {
    const moviesData = await getDataFromWatchlist(watchlist);
    renderMovies(moviesData, null);
    addRemoveBtnFunctionality();
  } catch (error) {
    console.log(error);
  }
};

// Listens for clicks on remove btn and removes that item form watchlist and saves it to local storage.
//  Excecutes a re-render of the hole page.
const addRemoveBtnFunctionality = () => {
  const removeBtnElements = document.querySelectorAll('.btn-watchlist');
  console.log(removeBtnElements);
  removeBtnElements.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const imdbId = e.target.closest('[data-imdbid]').dataset.imdbid;
      const index = watchlist.indexOf(imdbId);
      watchlist.splice(index, 1);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      loadAndRenderWatchlist();
    })
  );
};

loadAndRenderWatchlist();
