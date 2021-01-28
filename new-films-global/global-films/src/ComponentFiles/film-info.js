import React, { Component } from 'react';
import './film-info.css';


const APIKEY = '';

export default class FilmInfo extends Component {
    constructor(props) {
        super(props);

        this.genreList = [];
        this.props.data.genres.map(genreObj => {
            this.genreList.push(genreObj.name);
        });
        console.log(this.genreList);
        this.id = this.props.id;

        this.state = {
            isOpenCast: false
        }
    }




    componentDidMount() {
        console.warn('FILM INFOFFOF')
        console.log(this.props)
        this.genreList = [];
        this.props.data.genres.map(genreObj => {
            this.genreList.push(genreObj.name);
        });

        // this.handleGetCast();
    }


    

    // they want you to provide the film's
    // description, genres, tag line (if any), and runtime.

    // desc, genres, tag line(if), runtime
    // title, overview, genre_ids, tag_line, cast
    // id

    // If you have time, also provide a feature that allows the user to see the cast
    // of the films and be able to display other movies that they have appeared in.

    renderGenreList() {
        let genreString = '';
        this.genreList.map(genre => {
            genreString += genre + ' ';
            // return <div className="genre-item" key={`${genre}-${this.id}`}>{` ${genre} `}</div>
        });
        return <div className="info-detail same-line-detail genre-string" key={`${genreString}-${this.id}`}>{genreString}</div>
    }

    render() {
        return (
            // <div className="film-info-container">
            <div className="info-overlay-container">

                <div className="info-box-container">
                    <h1>{this.props.data.title}</h1>
                    <div className="detail-container">
                        <div className="detail-label"><b>Description: </b></div>
                        <div className="info-detail">{this.props.data.overview}</div>
                    </div>
                    <div className="detail-container">
                        <div className="detail-label"><b>Genres: </b></div>
                        {this.renderGenreList()}
                        {/* <div className="info-detail">
                        </div> */}

                    </div>
                    <div className="detail-container">
                        <div className="detail-label"><b>Tagline: </b></div>
                        <div className="same-line-detail info-detail">{this.props.data.tagline}</div>
                    </div>
                    <div className="detail-container">
                        <div className="detail-label"><b>Runtime: </b></div>
                        <div className="same-line-detail info-detail">{this.props.data.runtime} minutes</div>
                    </div>
                    <div className="detail-container">
                        <div className="detail-label"><b>Release Date: </b></div>
                        <div className="same-line-detail info-detail">{this.props.data.release_date}</div>
                    </div>
                    <div className="detail-container">
                        <div className="cast-link" onClick={this.handleGetCast}><b>Click for Cast</b></div>
                        {/* <div className="detail-label"><b>Cast: </b></div> */}

                    </div>
                    <div className="detail-container">

                    </div>
                    <div className="detail-container">

                    </div>

                    <button className="close-button" onClick={this.closeInfo}>Close</button>
                </div>
                {/* <div>
                    {this.state.isOpenInfo
                    ?   <FilmInfo data={this.state.filmInfoData} childCloser={this.handleChildClick} />
                    : null}
                </div> */}

            </div>

        )
    }

    closeInfo = () => {
        this.props.childCloser();
    }


    handleGetCast = () => {
        const url = 'https://api.themoviedb.org/3/movie/' + this.props.data.id + '/credits' + '?api_key=' + APIKEY;
        // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
        fetch(url)
        .then(result => result.json())
        .then(data => {
            console.warn('getCAST')
            console.log(data);
    //         this.setState({
    //             isOpenInfo: true,
    //             filmInfoData: data
    //         });
       });

    }
}