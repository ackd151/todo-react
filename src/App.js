import { useCallback, useEffect, useState } from "react";
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
  const [todosState, setTodosState] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || [...staticData]
  );

  const resetHandler = () => {
    localStorage.removeItem("todo-list");
    setTodosState([...staticData]);
  };

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todosState));
  }, [todosState]);

  const onCompleteHandler = (id) => {
    setTodosState((prevState) => {
      const newState = prevState.map((todo) => {
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
      prevState.push(newTodo);
      return [...prevState];
    });
  };

  const onDeleteHandler = useCallback((id) => {
    setTodosState((prevState) => {
      let idx = null;
      for (const i in prevState) {
        if (prevState[i].id === id) {
          idx = i;
        }
      }
      if (idx) {
        prevState.splice(idx, 1);
        return [...prevState];
      }
      console.log("Uh oh, shouldn't be here...");
      return [...prevState];
    });
  }, []);

  const clearCompletedHandler = () => {
    setTodosState((prevState) => {
      const newState = prevState.filter((todo) => !todo.complete);
      return [...newState];
    });
  };

  const moveTodoHandler = useCallback(
    (draggedIndex, hoveredIndex) => {
      const draggedTodo = todosState[draggedIndex];
      const hoveredTodo = todosState[hoveredIndex];
      // Reorder todos
      setTodosState((prevState) => {
        const newState = [...prevState];
        newState[draggedIndex] = hoveredTodo;
        newState[hoveredIndex] = draggedTodo;
        return [...newState];
      });
    },
    [todosState]
  );
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
        <Header
          theme={theme}
          onThemeToggle={themeToggleHandler}
          onReset={resetHandler}
        />
        <NewTodo onCheck={onAddHandler} />
        <Todos
          todos={todosState}
          onCheck={onCompleteHandler}
          onDelete={onDeleteHandler}
          onClear={clearCompletedHandler}
          moveTodo={moveTodoHandler}
        />
      </main>
      <footer>Drag and drop to reorder list</footer>
    </div>
  );
}

export default App;
