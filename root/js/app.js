const getData = async (title) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=386b4a50&s=${title}`
  );
  const data = await response.json();
  return data;
};

getData('Blade Runner').then((data) => console.log(data));
