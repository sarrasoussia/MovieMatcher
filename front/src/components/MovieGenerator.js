import React, { Component } from "react";
import Movies from "./Movies";
import "./MovieGenerator.css"

class MovieGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      selectedCategory: "", 
    };
  }

  fetchMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=781581c945d9332c6abee43dc297b5aa");
      const data = await response.json();
      this.setState({ movies: data.results, isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchMovies();
  }

  handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    this.setState({ selectedCategory });
  };

  render() {
    const { movies, isLoading, selectedCategory } = this.state;
    const filteredMovies = selectedCategory
      ? movies.filter((movie) => {
          if (selectedCategory === "37") { 
            return movie.genre_ids.includes(878);
          } else {
            return movie.genre_ids.includes(parseInt(selectedCategory));
          }
        })
      : movies;

    return (
      <div className="py-5">
        <div className="container-fluid card-gen">
          <h1 className="text-white text-center display-1 py-1" style={{ fontFamily: "cinematic" }}>
            Select <span style={{ color: "red" }}>Category</span>
          </h1>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            style={{ borderRadius: "15px", padding: "8px", border: "2px solid #ccc" }}
            onChange={this.handleCategoryChange}
          >
            <option selected value="">Search for movies</option>
            <option value="18">Drama</option>
            <option value="28">Action</option>
            <option value="27">Horror</option>
            <option value="35">Comedy</option>
            <option value="37">Sci-Fi</option>
          </select>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Movies movies={filteredMovies} />
          )}
        </div>
      </div>
    );
  }
}

export default MovieGenerator;
