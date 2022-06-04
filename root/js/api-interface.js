const getData = async (title) => {
  /* This API call is to get all the movies related to the serach. 
  It returns an array of movies with some data but not enougth to generate the full card */
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=386b4a50&s=${title}`
    );
    const data = await response.json();
    if (data.Error) {
      return [];
    }

    // Use Promise.all() to excecute all promises in parallel
    /* Loop over the movies array provided by the first API call and use the imdbID to call it again
        in order to get the complete date of each movie*/
    const moviesData = Promise.all(
      data.Search?.map(async (movie) => {
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

export default getData;
