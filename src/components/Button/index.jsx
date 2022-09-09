import P from 'prop-types';
import './styles.css';
import React  from 'react';

export const Button = ({ text, onClick, disabled = false }) => (
  <button className='button-load' onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};