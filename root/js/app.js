const moviesListElement = document.querySelector('#movies-list');

const getData = async (title) => {
  /* This API call is to get all the movies related to the serach. 
  It returns an array of movies with some data but not enougth to generate the full card */
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=386b4a50&s=${title}`
    );
    const data = await response.json();

    // Use Promise.all() to excecute all promises in parallel
    /* Loop over the movies array provided by the first API call and use the imdbID to call it again
        in order to get the complete date of each movie*/
    const moviesData = Promise.all(
      data.Search.map(async (movie) => {
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=386b4a50&i=${movie.imdbID}`
          );
          const data = await response.json();
          return data;
        } catch (e) {
          console.log(e);
        }
      })
    );
    return moviesData;
  } catch (e) {
    console.log(e);
  }
};

getData('Blade Runner').then((data) => console.log(data));

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
      <img class="movie-img" src="${poster}" alt="movie poster" />
      <div class="movie-info">
        <section class="movie-heading">
          <h2>${title}</h2>
          <img src="./img/start.svg" alt="start logo" />
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
