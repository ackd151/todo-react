import React from "react";

import "./Checkbox.css";

const Checkbox = ({ checked, onCheck }) => {
  return (
    <label className='checkbox-label'>
      <input type='checkbox' onChange={onCheck} />
      <svg
        className={`checkbox ${checked ? "checked" : ""}`}
        aria-hidden='true'
        fill='none'
        viewBox='-4 0 20 10'
      >
        <path
          stroke={checked ? "#FFF" : "none"}
          strokeWidth='2'
          d='M1 4.304L3.696 7l6-6'
        />
      </svg>
    </label>
  );
};

export default Checkbox;
