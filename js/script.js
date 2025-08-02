const global = {
  currentPage: window.location.pathname,
};

//highlight active link in navbar

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayPopularMovies() {
  const { results } = await fetchAPIKey('movie/popular'); // destructure results from the API response object to get the array of movies
  console.log(results);
  results.forEach((movie) => {
    if (movie.adult === true) {
      console.log(movie.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                src='IMAGE NOT SUPPORTED'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">DON'T WATCH IT: ${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
                </div>`;
      document.querySelector('#popular-movies').appendChild(addCard);
    } else {
      console.log(movie.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
                class='card-img-top'
                alt='${movie.title}'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='${movie.title}'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
                </div>`;
      document.querySelector('#popular-movies').appendChild(addCard);
    }
  });
}
// displayPopularMovies();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayPopularShows() {
  const { results } = await fetchAPIKey('tv/popular'); // destructure results from the API response object to get the array of shows
  console.log(results);
  results.forEach((show) => {
    if (show.adult === true) {
      console.log(show.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
      <a href="/movie-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
                src='IMAGE NOT SUPPORTED'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
          : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='IT IS A ADULT MOVIE, DON'T WATCH IT'
                />`
      }
                </a>
                <div class="card-body">
                <h5 class="card-title">DON'T WATCH IT: ${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${
                  show.first_air_date
                }</small>
                </p>
                </div>`;
      document.querySelector('#popular-movies').appendChild(addCard);
      name;
    } else {
      console.log(show.adult);
      const addCard = document.createElement('div');
      addCard.classList.add('card');
      addCard.innerHTML = `
            <a href="/tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
                src='https://image.tmdb.org/t/p/w500${show.poster_path}'
                class='card-img-top'
                alt='${show.name}'
                />`
                : `<img
                src='images/no-image.jpg'
                class='card-img-top'
                alt='${show.name}'
                />`
            }
                </a>
                <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Air Date: ${
                  show.first_air_date
                }</small>
                </p>
                </div>`;
      document.querySelector('#popular-shows').appendChild(addCard);
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function movieDetails() {
  console.log(window.location.search.split('=')[1]);
  const id = window.location.search.split('=')[1];
  const results = await fetchAPIKey(`movie/${id}`);
  console.log('movie detail', results);
  const detail = document.createElement('div');
  detail.innerHTML = `<div class="details-top">
          <div>
          ${
            results.poster_path
              ? `
            <img
              src="https://image.tmdb.org/t/p/w500${results.poster_path}"
              class="card-img-top"
              alt="Movie Title" />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title" />`
          }
          </div >
          <div>
            <h2>${results.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${results.release_date}</p>
            <p>
              ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${results.genres
              .map((genre) => {
                return `<li>${genre.name}</li>`;
              })
              .join('')}
             
            </ul>
            <a href="${
              results.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              results.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              results.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              results.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              results.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies
            .map((company) => {
              return `<span>${company.name}</span>`;
            })
            .join(', ')}</div>
        </div>`;
  document.querySelector('#movie-details').appendChild(detail);
}
// movieDetails();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchAPIKey(endpoint) {
  const key = '2222c7541cbbb37ecfbd5587d4554f78';
  const url = 'https://api.themoviedb.org/3';
  showSpinner();
  const movies = await fetch(
    `${url}/${endpoint}?api_key=${key}&language=en-US`
  );
  const resp = await movies.json();
  hideSpinner();
  return resp;
}
function highlightLink() {
  const link = document.querySelectorAll('.nav-link');
  link.forEach((element) => {
    if (element.getAttribute('href') === global.currentPage) {
      element.classList.add('active');
      console.log(`Active link: ${element.getAttribute('href')}`);
      console.log(`Current page: ${global.currentPage}`);
    }
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('homePage');
      displayPopularMovies();
      break;

    case '/movie-details.html':
      movieDetails();
      break;

    case '/search.html':
      console.log('searchPage');
      break;

    case '/shows.html':
      displayPopularShows();
      break;

    case '/tv-details.html':
      console.log('tvDetailsPage');
      break;
  }
  highlightLink();
}

document.addEventListener('DOMContentLoaded', init);

function addCommasToNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
}

function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('show');
}
