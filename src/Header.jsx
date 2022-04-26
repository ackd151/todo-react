import React from "react";

import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import "./Header.css";

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className='header'>
      <h1 className='title'>todo</h1>
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
