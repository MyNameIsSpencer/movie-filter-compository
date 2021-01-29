import React, { Component } from 'react';
import SoloFilm from './solo-film';
import { APIKEY } from './key';
import WhiteLogo from './logo-white.png';


const baseURL = 'https://api.themoviedb.org/3/';

export default class FilmList extends Component {
    constructor() {
        super();
        this.fluxFilmList = [];
    }

    state = {
        filmList: [],
    }

    getCurrentYearData() {
        this.curYear = new Date().getFullYear();
        const url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&sort_by=release_date.desc', '&primary_release_year=', this.curYear );
        this.mostUrl = url;
        fetch(url)
        .then(result => result.json())
        .then(data => {
            this.pageLength = data.total_pages;
            const pager = data.total_pages;
            for (let i = 1; i <= data.total_pages; i++) {
                if (i === pager) {
                    this.getPageData(i, true);
                } else {
                    this.getPageData(i, false);
                }
            }
        });
    }

    getPageData(pageNum, isLastPage) {
        const pageUrl = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&sort_by=release_date.desc', '&primary_release_year=', this.curYear, '&page=', pageNum );
        fetch(pageUrl)
        .then(result => result.json())
        .then(data => {
            // Decided not to use !== null as that would not catch undefined
            if (data != null && data.results != null) {
                const lengther = data.results.length;
                for (let i = 0; i < data.results.length; i++) {
                    if (isLastPage && i === (lengther - 1)) {
                        this.evaluateFilmPopularity(data.results[i]);
                        this.setFilmList();
                    } else {
                        this.evaluateFilmPopularity(data.results[i]);
                    }
                }
            }
        });

    }

    evaluateFilmPopularity(film) {
        if (film.popularity >= 10) {
            const isAlreadyIn = this.fluxFilmList.find(fluxFilm => {
                if (fluxFilm.id === film.id) {
                    return true;
                }
            });
            if (!isAlreadyIn) {
                this.fluxFilmList.push(
                    film
                );
            }
        }
    }

    componentDidMount() {
        this.getCurrentYearData();
    }

    setFilmList() {
        const priorityIndicies = [5, 6, 8, 9];
        this.fluxFilmList.sort((a, b) => {
            var r = 0;
            priorityIndicies.find(i => r = a.release_date.charCodeAt(i) - b.release_date.charCodeAt(i));
            return r;
        });
        this.setState({
            filmList: this.fluxFilmList,
        });
    }

    render () {
        return (
            <div>
                <div className="logo-header">
                    <img src={WhiteLogo}/>
                </div>
                <ul id="film-list">
                    {this.state.filmList.map((film) => {
                        return <SoloFilm key={film.id} id={film.id} title={film.title} posterPath={film.poster_path}></SoloFilm>
                    })}
                </ul>
            </div>
    )}
}
