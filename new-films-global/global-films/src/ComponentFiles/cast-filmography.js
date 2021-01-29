import React, { Component } from 'react';
import './film-info.css';
import { APIKEY } from './key';
import SoloFilm from './solo-film';


export default class CastFilmography extends Component {
    constructor(props) {
        super(props);
        this.isMemberFilmography = false;
        this.state = {
            filmography: []
        }
    }

    componentDidMount() {
        this.getCastFilmography();
    }
    
    getCastFilmography() {
        const url = 'https://api.themoviedb.org/3/person/' + this.props.castMember.id + '/movie_credits' + '?api_key=' + APIKEY;
        fetch(url)
        .then(result => result.json())
        .then(data => {
            this.setState({
                filmography: data.cast
            });
       });
    }

    render() {
        return (
            <div className="info-overlay-container">
                <div className="info-box-container">
                    <button className="close-button" onClick={this.closeInfo}>Close</button>
                    <h1>{this.props.castMember.name}</h1>
                    <div>
                        {this.state.filmography.map((film) => {
                            return <SoloFilm key={film.id} id={film.id} title={film.title} posterPath={film.poster_path}></SoloFilm>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    closeInfo = () => {
        this.props.childCloser();
    }
}
