import React, { Component } from 'react';
import FilmInfo from './film-info';
import './solo-film.css';
import { APIKEY } from './key';


export default class SoloFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenInfo: false,
            filmInfoData: null
        };
        this.renderInfo = this.renderInfo.bind(this);
    }

    renderImage() {
        if (this.props.posterPath) {
            const imageUrl = "https://image.tmdb.org/t/p/w154/" + this.props.posterPath; 
            return <img src={imageUrl} className="image-class"/>
        }
        return <div className="empty-image-box">No Image Found</div>
    }

    renderInfo = () => {
        const url = 'https://api.themoviedb.org/3/movie/' + this.props.id + '?api_key=' + APIKEY;
        fetch(url)
        .then(result => result.json())
        .then(data => {
            this.setState({
                isOpenInfo: true,
                filmInfoData: data
            });
        });

    }

    handleChildClick = () => {
        this.setState({isOpenInfo: false});
    }

    render() {
        return (
            <div className="film-container">
                <div className="image-container" onClick={this.renderInfo}>{this.renderImage()}</div>
                <div className="title-container" onClick={this.renderInfo}><p className="title-class">{this.props.title}</p></div>
                <div>
                    {this.state.isOpenInfo
                    ?   <FilmInfo data={this.state.filmInfoData} childCloser={this.handleChildClick} />
                    : null}
                </div>
            </div>
        )
    }
}
