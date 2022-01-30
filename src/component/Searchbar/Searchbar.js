import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.scss';
import { GoSearch } from 'react-icons/go';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const hendleTextChange = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const hendleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.warning('Please, enter a request');
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={hendleSubmit}>
        <button type="submit" className="SearchForm-button">
          <GoSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={hendleTextChange}
          value={value}
        />
      </form>
    </header>
  );
}

export default Searchbar;
