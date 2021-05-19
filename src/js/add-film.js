const title = document.getElementById('title'),
      overview =document.getElementById('overview'),
      posterPath = document.getElementById('poster-path'),
      popular = document.getElementById('popular'),
      date = document.getElementById('date'),
      genre = document.getElementById('genres'),
      voteAverage = document.getElementById('vote-average'),
      voteCount = document.getElementById('vote-count'),
      add = document.getElementById('add');

const movie = {};

function getMovieTitle() {
    movie.title = title.value;
    console.log(movie)
}

add.addEventListener('submit', (e) => {
    
    e.preventDefault();

    getMovieTitle();

    movie.overview = overview.value;

    movie.posterPath = posterPath.value;

    movie.popular = popular.value;

    movie.date = date.value;

    movie.genre = genre.value;

    movie.voteAverage = voteAverage.value;

    movie.voteCount = voteCount.value;

    showMovie(movie);
})

function showMovie(movie) {
    var w = window.open('../../index.html');
    w.onload = function() {
        let p = document.createElement('p');
        p.innerHTML = `
            lorem ipsum
        `
        w.document.body.prepend(p);

    }
}

// console.log(movie)



// class Movie {
//     constructor(title, overview, posterPath) {
//         this.title = title;
//         this.overview = overview;
//         this.posterPath = posterPath;
//     }
// }