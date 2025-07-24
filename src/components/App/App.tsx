import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { fetchMovies } from '../../services/movieService';
import type { Movie, MoviesResponse } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<MoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10, 
  });

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectMovie = (movie: Movie) => {
    alert(`Selected movie: ${movie.title}`);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />

      {isPending && <Loader />}
      {isError && <ErrorMessage message={error.message} />}
      {data && data.results.length === 0 && (
        <ErrorMessage message="No movies found." />
      )}
      {data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={handleSelectMovie} />
          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}
    </div>
  );
}
