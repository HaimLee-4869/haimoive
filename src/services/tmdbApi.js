import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

// TMDB API를 사용하여 비밀번호 해싱
export const hashPassword = async (password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/token/new`,
      { password }, // TMDB API가 요구하는 구조에 맞게 수정
      { params: { api_key: API_KEY } }
    );
    return response.data.hashedPassword; // TMDB API가 반환하는 데이터 구조에 따라 수정 필요
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw error;
  }
};

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
