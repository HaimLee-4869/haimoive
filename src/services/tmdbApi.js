// src/services/tmdbApi.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    throw error;
  }
};

// 사용 예시
// fetchMovies('/movie/popular', { page: 1 });
