import React, { useState } from "react";
import PropTypes from "prop-types";

const Toggle = ({ text, handleSetToggle }) => {
  const [checked, setChecked] = useState(true);

  const handleToggle = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    handleSetToggle(checked);
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
  handleSetToggle: PropTypes.func.isRequired,
};

export default Toggle;
