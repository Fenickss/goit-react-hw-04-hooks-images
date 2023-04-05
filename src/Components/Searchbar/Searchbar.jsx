import { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import PropTypes from 'prop-types';

import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handeleImgNameChange = event => {
    setImgName(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imgName.trim() === '') {
      alert('Введите имя картинки');
      return;
    }
    onSubmit(imgName);
    setImgName('');
  };

  return (
    <header className={style.Searchbar}>
      <form onSubmit={handleSubmit} className={style.SearchForm}>
        <button type="submit" className={style.button}>
          <CiImageOn style={{ width: 30, height: 30 }} />
          <span className={style.button_label}>Search</span>
        </button>

        <input
          onChange={handeleImgNameChange}
          className={style.input}
          value={imgName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
