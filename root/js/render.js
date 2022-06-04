// Create the html template for a single movie card
const getMovieCardHtml = (movieDetails) => {
  const {
    imdbID: imdbId,
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
              <button class="btn-watchlist" data-imdbiD=${imdbId}>
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
  const moviesListElement = document.querySelector('#movies-list');
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

export { renderMovies };
