import { useEffect, useState } from "react";
import Header from "./Header";
import NewTodo from "./NewTodo";
import Todos from "./Todos";

import bgDeskLight from "./assets/bg-desktop-light.jpg";
import bgDeskDark from "./assets/bg-desktop-dark.jpg";

import { getNewId } from "./utils/todoUtils";

import "./App.css";

// Static dev-data
import staticData from "./devData";

function App() {
  /* THEME mgmt*/
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
  /** end - THEME mgmt */

  /** TODOS state mgmt */
  // dev static data
  // const [todosState, setTodosState] = useState(staticData);
  ///////
  localStorage.removeItem("todo-list");
  const storedData =
    JSON.parse(localStorage.getItem("todo-list")) || staticData;

  const [todosState, setTodosState] = useState(storedData);
  // console.log("local: ", storedData);
  // console.log(todosState);

  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todo-list"));
  //   if (todos) {
  //     setTodosState(todos);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todosState));
  }, [todosState]);

  const onCompleteHandler = (id) => {
    setTodosState((prevState) => {
      let newState = prevState.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return { ...todo };
      });
      return [...newState];
    });
  };

  const onAddHandler = (newTodo) => {
    newTodo.id = getNewId(todosState);
    setTodosState((prevState) => {
      const newState = [...prevState];
      newState.push(newTodo);
      return newState;
    });
  };
  /** end - TODOS state mgmt */

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
        <NewTodo onCheck={onAddHandler} />
        <Todos todos={todosState} onCheck={onCompleteHandler} />
      </main>
    </div>
  );
}

export default App;
