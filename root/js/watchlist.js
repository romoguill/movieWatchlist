import { getDataFromWatchlist } from './api-interface.js';
import { renderMovies } from './render.js';

const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

const loadAndRenderWatchlist = async () => {
  try {
    const moviesData = await getDataFromWatchlist(watchlist);
    renderMovies(moviesData, null);
  } catch (error) {
    console.log(error);
  }
};

loadAndRenderWatchlist();
