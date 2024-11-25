import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/tmdbApi'; // TMDB API 호출 함수
import MovieCard from './MovieCard'; // 재사용 가능한 영화 카드 컴포넌트
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovies('/movie/popular'); // TMDB 인기 영화 데이터 호출
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="home">
      <h1>Popular Movies</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
