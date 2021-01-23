// Please include a valid api key in key.js

const decadeContainer = document.getElementById('decade-container');
const annumContainer = document.getElementById('annum-container');
const selectedYear = document.getElementById('selected-year');
const movieListContainer = document.getElementById('movie-list-content-container');

let baseURL = 'https://api.themoviedb.org/3/';
let chosenDecade = null;
let chosenAnnum = null;

let fullYear = null;

for (let i = 202; i > 186; i--) {
    let decadeDivver = document.createElement('div');
    decadeDivver.classList.add('decade-div');
    decadeDivver.id = `${i}`
    decadeDivver.innerText = `${i}0s`;
    decadeContainer.appendChild(decadeDivver);
}

for (let i = 0; i < 10; i++) {
    let annumDiv = document.createElement('div');
    annumDiv.classList.add('annum-div');
    annumDiv.id = `${i}`
    annumDiv.innerText = `${i}`;
    annumContainer.appendChild(annumDiv);
}

function handleDecadeClick(event) {
    chosenDecade = event.srcElement.id;
    evaluateYearValues();
}

function handleAnnumClick(event) {
    chosenAnnum = event.srcElement.id;
    evaluateYearValues();
}

function evaluateYearValues() {
    if (chosenDecade !== null && chosenAnnum !== null) {
        const newChosenYear = chosenDecade + chosenAnnum;
        if (newChosenYear !== fullYear) {
            movieListContainer.innerHTML = '';
            fullYear = newChosenYear;
            selectedYear.innerText = `${fullYear} Top Ten Movies`;
            getAnnumData(newChosenYear);
        }
    } else if (chosenDecade !== null && chosenAnnum === null) {
        selectedYear.innerText = 'Now select a year from above';
    } else if (chosenDecade === null && chosenAnnum !== null) {
        selectedYear.innerText = 'Now select a decade from above';
    }
}

function getAnnumData(targetYear) {
    const url = ''.concat(baseURL, 'movie/top_rated?api_key=', APIKEY, '&language=en&with_original_language=en', '&primary_release_year=', targetYear);
    fetch(url)
    .then(result => result.json())
    .then((data) => {
        evaluateMovieList(data);
    });
}

function evaluateMovieList(data) {
    const totalMovieList = data.results
    if (totalMovieList.length >= 10) {
        renderMovieList(data.results, 10);
    } else if (totalMovieList.length < 10 && totalMovieList.length > 0) {
        renderMovieList(data.results, totalMovieList.length);
    } else {

    }
}

function renderMovieList(movieData, listLength) {
    for (let i = 0; i < listLength; i++) {
        currentMovie = movieData[i];
        let movieDivver = document.createElement('div');
        let posterPath = currentMovie.poster_path;
        movieDivver.classList.add('movie-div');
        movieDivver.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w342${posterPath}" alt="Poster Not Found"/>
            <div class="movie-details">
                <div><b>${currentMovie.title}</b></div>
                <div>${currentMovie.release_date}</div>
            </div>
        `;
        movieListContainer.appendChild(movieDivver);
    }
}
