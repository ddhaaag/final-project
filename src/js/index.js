const API_KEY = 'api_key=a002d542c3280c497bec0284722ca778';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const filter = document.getElementById('filter');

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}


filter.addEventListener('change', (e) => {
    if (filter.value == 'vote_average.desc') {
      sortMovies(filter.value)
  } else if (filter.value == 'vote_average.asc') {
      sortMovies(filter.value)
  } else if (filter.value == 'release_date.desc') {
      sortMovies(filter.value)
  } else if (filter.value == 'release_date.asc') {
    sortMovies(filter.value)
  } else {
    getMovies(API_URL);
  }
}) 

function sortMovies(value) {
  console.log(value);
  let splitUrl = API_URL.split('=');
  // console.log(splitUrl)
  let getValue = splitUrl[1].split('&');
  let key = getValue[0];

  key = value;
  getValue[0] = key;
  let newValue = getValue.join('&');  
  let url = splitUrl[0] + '=' + newValue + '=' + splitUrl[2];
  getMovies(url);
}

const main = document.getElementById('main');
const movieList = document.getElementById('movie-list');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

//
var getID = '';
//

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovie(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.classList.add('disabled');
          next.classList.remove('disabled')
        } else if (currentPage>= totalPages){
          prev.classList.remove('disabled');
          next.classList.add('disabled')
        } else {
          prev.classList.remove('disabled');
          next.classList.remove('disabled')
        }
      } else {
        movieList.innerHTML= `<h1 class="no-results">No Results Found</h1>`
      }   
    })
}

function showMovie(data) {
  movieList.innerHTML = '';

  data.forEach(movie => {
    const {title, poster_path, vote_average, release_date, id} = movie;
      const movieEL = document.createElement('div');
      movieEL.classList.add('movie');
      movieEL.setAttribute("id", `${id}`);
      movieEL.innerHTML = `

       <a href="../src/common/template.html?${id}">      
        <img id="${id}" src="${IMG_URL + poster_path}" alt="${title}">

        C/O https://placeholder.com/>
      </a>    
        <div class="movie__title">
          <h3>${title}</h3>
        </div>
        
        <div class="movie__info">
          <span class="${getColor(vote_average)}">${vote_average}</span>
          <p class="release-date">${release_date}</p>  
        </div>
      `
      movieList.appendChild(movieEL);

    document.getElementById(id).addEventListener('click', () => {
      console.log(id);
    })

  });

}


function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

// console.log(response);
prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if (key[0] != 'page') {
    let url = lastUrl + '&page=' + page
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}

movieList.addEventListener('click', getMoviePage);

function getMoviePage(e) {

  if (e.target.tagName != 'IMG') return;
  let imgID = e.target.id;
  let movieID = 'https://api.themoviedb.org/3/movie/' + imgID + '?' + API_KEY;
  console.log(movieID);

  getMoviePage(movieID);

function getMoviePage(movieUrl) {

  fetch(movieUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const {overview, genres, popularity, release_date, title, vote_average, vote_count} = data;
      console.log(data.overview, data.vote_average)
      // var opened = window.open("");
      // opened.document.write("`${data.title}`");

    })
}

    // window.open(movieID);
}



