import React from "react";

import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import "./Header.css";

const Header = ({ theme, onThemeToggle, onReset }) => {
  return (
    <header className='header'>
      <div className='row-gap'>
        <h1 className='title'>todo</h1>
        <button className='reset-btn' onClick={onReset}>
          reset
        </button>
      </div>
      <button className='theme-toggler' onClick={onThemeToggle}>
        <img
          src={theme === "dark" ? sun : moon}
          alt='theme toggler'
          className='theme-toggle-img'
        />
      </button>
    </header>
  );
};

export default Header;
