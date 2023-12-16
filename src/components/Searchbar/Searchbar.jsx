import React, { useState } from 'react';

import { IoSearchOutline } from 'react-icons/io5';
import { Container } from '../Searchbar/Container';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  //----------------------------------------->
  const handleChange = e => {
    setQuery(e.target.value);
  };
  //----------------------------------------->
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };
  //----------------------------------------->
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>
            <IoSearchOutline />
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
}

export default Searchbar;
