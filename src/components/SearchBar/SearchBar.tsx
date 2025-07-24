import { useForm } from 'react-hook-form';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const { register, handleSubmit, reset } = useForm<{ query: string }>();

  const handleFormSubmit = ({ query }: { query: string }) => {
    onSubmit(query.trim());
    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        className={css.input}
        type="text"
        placeholder="Search movies..."
        {...register('query', { required: true })}
      />
      <button className={css.button} type="submit">Search</button>
    </form>
  );
}
