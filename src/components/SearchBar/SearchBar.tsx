import type { FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Please enter a search query!');
      return;
    }

    onSubmit(query);
    e.currentTarget.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies..."
      />
      <button className={css.button} type="submit">Search</button>
    </form>
  );
}
