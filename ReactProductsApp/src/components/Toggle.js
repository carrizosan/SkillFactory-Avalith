import React, { useState } from "react";
import PropTypes from "prop-types";

const Toggle = ({ text, handleSetProducts }) => {
  const [checked, setChecked] = useState(true);

  const handleToggle = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    handleSetProducts(checked);
  };

  return (
    <div className='toggle-container'>
      <input type='checkbox' id='toggle' onChange={handleToggle} checked={checked}></input>
      <label htmlFor='toggle'>{text}</label>
    </div>
  );
};

Toggle.propTypes = {
  text: PropTypes.string,
  handleSetProducts: PropTypes.func.isRequired,
};

export default Toggle;
