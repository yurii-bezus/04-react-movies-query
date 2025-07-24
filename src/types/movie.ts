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

