import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies("movie/popular");
      setMovies(data.results);
    };
    loadMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
