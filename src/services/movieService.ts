import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    params: {
      query,
      page,
    },
  });

  return response.data;
}
