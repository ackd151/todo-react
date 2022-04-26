import React, { useState } from "react";

import "./Checkbox.css";

const Checkbox = ({ completed, onCheck }) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheck = () => {
    const status = !isChecked;
    setIsChecked(status);
    onCheck();
  };

  return (
    <label className='checkbox-label'>
      <input type='checkbox' onChange={handleCheck} />
      <svg
        className={`checkbox ${isChecked ? "checked" : ""}`}
        aria-hidden='true'
        fill='none'
        viewBox='-4 0 20 10'
      >
        <path
          stroke={isChecked ? "#FFF" : "none"}
          strokeWidth='2'
          d='M1 4.304L3.696 7l6-6'
        />
      </svg>
    </label>
  );
};

export default Checkbox;
