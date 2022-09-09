import P from 'prop-types';
import './styles.css';
import React  from 'react';

export const TextInput = ({ searchValue, handleInputChange }) => {
    return (
        <input
            type="search"
            className='text-input'
            onChange={handleInputChange}
            value={searchValue}
            placeholder="Type your search"
        />
    )
}

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleInputChange: P.func.isRequired,
};