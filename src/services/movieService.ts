import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

export interface MoviesResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  if (!ACCESS_TOKEN) {
    throw new Error('TMDB access token is missing.');
  }

  const response = await axios.get<MoviesResponse>(BASE_URL, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });

  return response.data;
}
