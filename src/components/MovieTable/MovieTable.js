import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import URLService from '../../services/Url';
import './MovieTable.css';

const genreMap = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부'
};

const getGenreNames = (genreIds) => {
  if (!genreIds) return '-';
  return genreIds.map(id => genreMap[id] || id).join(', ');
};

function MovieTable({ fetchUrl }) {
  const urlService = new URLService();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await urlService.fetchPopularMovies(currentPage);
      setMovies(fetchedMovies);
    };
    fetchMovies();
  }, [fetchUrl, currentPage]);

  return (
    <div className="movie-table-container">
      <table className="movie-table">
        <thead>
          <tr>
            <th>포스터</th>
            <th>제목</th>
            <th>개봉</th>
            <th>평점</th>
            <th>장르</th>
            <th>줄거리</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="movie-row">
              <td className="poster-cell">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </td>
              <td className="title-cell">{movie.title}</td>
              <td>{new Date(movie.release_date).toLocaleDateString('ko-KR')}</td>
              <td className="rating-cell">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(movie.vote_average / 2) ? 'star filled' : 'star'}
                    />
                  ))}
                  <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
              </td>
              <td>{getGenreNames(movie.genre_ids)}</td>
              <td className="overview-cell">
                <div className="overview">{movie.overview}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}>
          ◁
        </button>
        <span> {currentPage} 페이지 </span>
        <button onClick={() => setCurrentPage(prev => prev + 1)}>
          ▷
        </button>
      </div>
    </div>
  );
}

export default MovieTable;