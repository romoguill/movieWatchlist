import getData from './api-interface.js';

const moviesListElement = document.querySelector('#movies-list');
const formElement = document.querySelector('form');

// Create the html template for a single movie card
const getMovieCardHtml = (movieDetails) => {
  const {
    Title: title,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Poster: poster,
  } = movieDetails;

  return `
    <article class="movie-card">
      <div class="img-container">
        <img class="movie-img" src="${poster}" alt="movie poster" />
      </div>
      <div class="movie-info">
        <section class="movie-heading">
          <h2>${title}</h2>
          <img src="./img/star.svg" alt="start logo" />
          <p class="movie-rating">${imdbRating}</p>
        </section>
        <section class="movie-meta">
          <ul>
            <li>${runtime}</li>
            <li>${genre}</li>
            <li>
              <button class="btn-watchlist">
                <ul>
                  <li><img src="./img/plusButton.svg" alt="watchlist add button" /></li>
                  <li>Watchlist</li>
                </ul>
              </button>
            </li>
          </ul>
        </section>
        <section class="movie-description">
          <p>
            ${plot}
          </p>
        </section>
      </div>
    </article>`;
};

// Insert html of all the movie cards into the container
const renderMovies = (moviesData) => {
  // If there are no movies that matched the title searched, render message
  if (!moviesData.length) {
    moviesListElement.innerHTML = `
      <div class="container-no-selection">
        <p>Unable to find what you’re looking for. Please try another search.</p>
      </div>
    `;
    return;
  }

  moviesListElement.innerHTML = moviesData
    .map((movie) => getMovieCardHtml(movie))
    .join('');
};

// Listen for a title search, search for the data and render it
formElement.addEventListener('submit', async (e) => {
  const formData = new FormData(formElement);
  const titleSearched = formData.get('title');

  const moviesData = await getData(titleSearched);
  console.log(moviesData);
  renderMovies(moviesData);
});
