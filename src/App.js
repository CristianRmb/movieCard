import React from 'react';
import './Card.css';

class App extends React.Component {
  state = {
    movieList: [],
    loadingData: true,
  };

  mostraFilm = () => {
    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1',
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movieList: data.results,
          loadingData: false,
        });
      });
  };

  nascondiFilm = () => {
    this.setState({
      movieList: [],
    });
  };

  render() {
    const imgLink = 'https://image.tmdb.org/t/p/w500';
    const imgMovies = this.state.movieList.map(
      (movie) => imgLink + movie.backdrop_path,
    );
    const titleMovies = this.state.movieList.map(
      (movie) => movie.original_title,
    );
    const descriptionMovies = this.state.movieList.map(
      (movie) => movie.overview,
    );

    const Cards = [];

    for (let i = 0; i < titleMovies.length; i++) {
      Cards.push(
        <div key={i} className='cardContainer'>
          <img className='cardImg' alt={titleMovies[i]} src={imgMovies[i]} />
          <h2 className='cardTitle'>{titleMovies[i]}</h2>
          <p className='description'>{descriptionMovies[i]}</p>
        </div>,
      );
    }

    return (
      <div>
        <button onClick={this.mostraFilm}>Mostra Film</button>
        <button onClick={this.nascondiFilm}>Nascondi Film</button>
        {!this.state.loadingData && <div className='container'>{Cards}</div>}
      </div>
    );
  }
}

export default App;
