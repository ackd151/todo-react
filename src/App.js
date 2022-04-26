import { useState } from "react";
import Header from "./Header";
import NewTodo from "./NewTodo";
import Todos from "./Todos";

import bgDeskLight from "./assets/bg-desktop-light.jpg";
import bgDeskDark from "./assets/bg-desktop-dark.jpg";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const themeToggleHandler = () => {
    setTheme((prev) => {
      // refactor when mechanism for responsive img/theme switch impl
      const newTheme = prev === "light" ? "dark" : "light";
      setDocumentTheme(newTheme);
      return newTheme;
    });
  };

  const setDocumentTheme = (theme) =>
    (document.documentElement.className = theme);

  return (
    <div className='App'>
      <div className='app-bg'>
        <img
          src={theme === "dark" ? bgDeskDark : bgDeskLight}
          alt='background'
        />
      </div>
      <main className='app-content'>
        <Header theme={theme} onThemeToggle={themeToggleHandler} />
        <NewTodo />
        <Todos />
      </main>
    </div>
  );
}

export default App;
