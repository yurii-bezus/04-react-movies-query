import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });
  return response.data;
}
