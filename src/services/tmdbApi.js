import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint, params = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await axios.get(url, {
    params: { api_key: API_KEY, ...params },
  });
  return response.data;
};
