import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Container } from './Container';

type SearchbarProps = {
  onSubmit: (query: string) => void;
};

const Searchbar: React.FC<SearchbarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>
            {React.createElement(
              IoSearchOutline as unknown as React.ElementType,
              { size: 24 }
            )}
          </span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </Container>
  );
};

export default Searchbar;
