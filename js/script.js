const global = {
  currentPage: window.location.pathname,
};

//highlight active link in navbar

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular'); // destructure results from the API response object to get the array of movies
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
  const { results } = await fetchApiData('tv/popular'); // destructure results from the API response object to get the array of shows
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
  const results = await fetchApiData(`movie/${id}`);
  console.log('movie detail', results);
  backgroundImage('movie', results.backdrop_path);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function tvDetails() {
  console.log(window.location.search.split('=')[1]);
  const id = window.location.search.split('=')[1];
  const result = await fetchApiData(`tv/${id}`);
  backgroundImage('show', result.backdrop_path);
  console.log('tv detail', result);
  const detail = document.createElement('div');
  detail.innerHTML = `<div class="details-top">
            <div>
            ${
              result.poster_path
                ? `
              <img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="Movie Title" />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title" />`
            }
            </div >
            <div>
              <h2>${result.name}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${result.vote_average.toFixed(1)} / 10
              </p>
              <p class="text-muted">Air Date: ${result.first_air_date}</p>
              <p>
                ${result.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
              ${result.genres
                .map((genre) => {
                  return `<li>${genre.name}</li>`;
                })
                .join('')}

              </ul>
              <a href="${
                result.homepage
              }" target="_blank" class="btn">Visit Show Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Show Info</h2>
            <ul>
              <li><span class="text-secondary">Number of Episodes:</span> ${addCommasToNumber(
                result.number_of_episodes
              )}</li>
              <li><span class="text-secondary">Last Episode To Air:</span> ${
                result.last_episode_to_air.name
              }</li>
              <li><span class="text-secondary">Status:</span> ${
                result.status
              }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${result.production_companies
              .map((company) => {
                return `<span>${company.name}</span>`;
              })
              .join(', ')}</div>
          </div>`;
  document.querySelector('#show-details').appendChild(detail);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchApiData(endpoint) {
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
      tvDetails();
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

async function backgroundImage(type, backgroundPath) {
  showSpinner();
  const overlay = document.createElement('div');
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlay.style.backgroundSize = 'cover';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0.1';
  overlay.style.backgroundPosition = 'center';
  overlay.style.backgroundRepeat = 'no-repeat';
  hideSpinner();

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlay);
  } else {
    document.querySelector('#show-details').appendChild(overlay);
  }
}
