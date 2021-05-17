const url = window.location.href;
const splitUrl = url.split('?');
let urlID = splitUrl[1];
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const genres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=a002d542c3280c497bec0284722ca778';

const moviePage = `https://api.themoviedb.org/3/movie/${urlID}?api_key=a002d542c3280c497bec0284722ca778&language=en-US`;

getMovie(moviePage)

function getMovie(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showMovie(data);
        })
}

function showMovie(movie) {
    console.log(movie);

    const { overview, genres, popularity, release_date, title, vote_average, vote_count, poster_path } = movie;

    const movieGenres = [];

    genres.map(genre => {
        movieGenres.push(genre.name)    
    });
    console.log(movieGenres)

    const film = document.createElement('div');
    film.classList.add('movie')

    film.innerHTML = `
        <div class="movie__img">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </div>
        <div class="movie__info">
            <h3>Title: ${title}</h3>
            <p>Overview: ${overview}</p>
            <p>Release_date: ${release_date}</p>
            <p>Popularity: ${popularity}</p>
            <p>Vote_average: ${vote_average}</p>
            <p>Vote_count: ${vote_count}</p>
            <p>Genres: ${movieGenres}</p>
        </div>
        `
    document.body.append(film);
}