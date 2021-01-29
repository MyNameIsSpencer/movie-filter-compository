import React, { Component } from 'react';
import './film-info.css';
import { APIKEY } from './key';
import CastFilmography from './cast-filmography';


export default class FilmInfo extends Component {
    constructor(props) {
        super(props);
        this.genreList = [];
        this.props.data.genres.map(genreObj => {
            this.genreList.push(genreObj.name);
        });
        this.id = this.props.id;
        this.state = {
            isOpenCast: false,
            castData: [],
            soloMember: null
        }
    }

    componentDidMount() {
        this.genreList = [];
        this.props.data.genres.map(genreObj => {
            this.genreList.push(genreObj.name);
        });

        this.handleGetCast();
    }

    renderGenreList() {
        let genreString = '';
        this.genreList.map(genre => {
            genreString += genre + ' ';
        });
        return <div className="info-detail same-line-detail genre-string" key={`${genreString}-${this.id}`}>{genreString}</div>
    }

    render() {
        return (
            <div className="info-overlay-container">
                <div className="info-box-container">
                    <button className="close-button" onClick={this.closeInfo}>Close</button>
                    <h1>{this.props.data.title}</h1>
                    <div className="detail-container">
                        <div className="detail-label"><b>Description: </b></div>
                        <div className="info-detail">{this.props.data.overview}</div>
                    </div>
                    <div className="detail-container">
                        <div className="detail-label"><b>Genres: </b></div>
                        {this.renderGenreList()}
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
                        <div className="cast-link"><b>Cast</b> (Click to view other films with that actor)</div>
                        {this.state.castData.map((member) => {
                            return <div className="cast-member" key={member.name} onClick={() => {this.handleCastMemberClick(member.id, member.name, member.profile_path)}}><b>{member.character}:</b>  {member.name}</div>
                        })}
                    </div>
                    <div className="detail-container">

                    </div>
                    <div className="detail-container">
                    </div>
                    <div>
                        {this.state.isOpenCast
                        ? this.renderCastMember()
                        : null}
                    </div>
                </div>
            </div>
        )
    }

    renderCastMember = () => {
        return <CastFilmography castMember={this.state.soloMember} childCloser={this.handleChildCloser}></CastFilmography>;
    }

    handleCastMemberClick = (castId, castName, profilePath) => {
        this.setState({
            isOpenCast: true,
            soloMember: {id: castId, name: castName, path: profilePath}
        });
    }

    handleChildCloser = () => {
        this.setState({isOpenCast: false});
    }

    closeInfo = () => {
        this.props.childCloser();
    }

    handleGetCast = () => {
        const url = 'https://api.themoviedb.org/3/movie/' + this.props.data.id + '/credits' + '?api_key=' + APIKEY;
        fetch(url)
        .then(result => result.json())
        .then(data => {
            this.setState({
                castData: data.cast
            });
       });
    }
}