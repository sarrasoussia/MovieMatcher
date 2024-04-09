import React from "react";
import './Movies.css';

const Movies = ({ movies }) => {
  return (
    <div className="container-fluid">
      <h1 className="text-white text-center display-1" style={{ fontFamily: "cinematic" }}>Popular <span style={{ color: "red" }}>Movies</span></h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies && movies.map((movie) => (
          <div className="col" key={movie.id}>
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top movie-card-img"
              />
              <div className="card-body">
                <h5 className="card-title movie-card-title text-dark text-center">{movie.title}</h5>
                
                <p className="movie-description text-center">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
