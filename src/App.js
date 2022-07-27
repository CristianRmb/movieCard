import React from 'react';
import './Card.css';

class App extends React.Component {
  state = {
    movieList: [],
    loadingData: true,
    fetchPath:
      'https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1',
    curentPage: 0,
    onPage: 0,
  };

  mostraFilm = () => {
    fetch(this.state.fetchPath)
      .then((response) => response.json())
      .then((data) => {
        /* estraggo la pagina dal "link" */
        let page = parseInt(this.state.fetchPath.split('page=')[1]);
        this.setState({
          movieList: data.results,
          loadingData: false,
          curentPage: page,
        });
      });
    console.log(this.state);
  };

  nascondiFilm = () => {
    this.setState({
      movieList: [],
    });
  };

  nextPage = () => {
    /* converto stringa in array per poterla poi modificare */
    let nextpage = this.state.fetchPath.split('page=');
    /* seleziono la pag dal array e la incremento di 1*/
    let page = parseInt(nextpage[1]);
    page += 1;
    if (page <= 500) {
      let newLink = nextpage[0] + 'page=' + page;
      fetch(newLink)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            fetchPath: newLink,
            movieList: data.results,
            loadingData: false,
            curentPage: page,
          });
        });
    }
  };

  previousPage = () => {
    /* converto stringa in array per poterla poi modificare */
    let nextpage = this.state.fetchPath.split('page=');
    /* seleziono la pag dal array e la incremento di 1*/
    let page = parseInt(nextpage[1]);
    page -= 1;
    if (page > 0) {
      let newLink = nextpage[0] + 'page=' + page;
      fetch(newLink)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            fetchPath: newLink,
            movieList: data.results,
            loadingData: false,
            curentPage: page,
          });
        });
    }
  };

  handleInput = (event) => {
    this.setState({
      onPage: event.target.value,
    });
  };

  vaiPag = () => {
    let linkPage = this.state.fetchPath.split('page=');
    let newLink = linkPage[0] + 'page=' + this.state.onPage;
    if (this.state.onPage > 0 && this.state.onPage <= 500) {
      fetch(newLink)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            fetchPath: newLink,
            movieList: data.results,
            loadingData: false,
            curentPage: this.state.onPage,
          });
        });
    }
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
          <h3 className='cardTitle'>{titleMovies[i]}</h3>
          <h5 className='releaseDate'>
            {this.state.movieList[i].release_date}
          </h5>
          <p className='description'>{descriptionMovies[i]}</p>
        </div>,
      );
    }

    return (
      <div>
        <div>
          <button onClick={this.mostraFilm}>Mostra Film</button>
          <button onClick={this.nascondiFilm}>Nascondi Film</button>
          <button onClick={this.nextPage}>Next page</button>
          <button onClick={this.previousPage}>Previous page</button>
          <div>
            <input
              name='onPage'
              placeholder={'1-500'}
              onChange={this.handleInput}
            />
            <button onClick={this.vaiPag}>Vai alla pagina</button>
          </div>
          <h3>Page : {this.state.curentPage}</h3>
        </div>
        {!this.state.loadingData && <div className='container'>{Cards}</div>}
      </div>
    );
  }
}

export default App;
