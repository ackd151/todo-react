import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import NewTodo from "./NewTodo";
import Todos from "./Todos";
import {
  addTodoLogic,
  completeTodoLogic,
  deleteTodoLogic,
  clearCompletedLogic,
} from "./utils/todoStateLogic";
import bgDeskLight from "./assets/bg-desktop-light.jpg";
import bgDeskDark from "./assets/bg-desktop-dark.jpg";
import bgMobileLight from "./assets/bg-mobile-light.jpg";
import bgMobileDark from "./assets/bg-mobile-dark.jpg";
import "./App.css";
// Static dev-data
import staticData from "./devData";

// limit screen resize calls
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App() {
  /* THEME mgmt*/
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [screenType, setScreenType] = useState(
    window.innerWidth < 700 ? "mobile" : "desktop"
  );
  const [bgImg, setBgImg] = useState(bgDeskLight);

  useEffect(() => {
    setTheme(() => {
      const savedTheme = localStorage.getItem("theme");
      bgImgSetter(screenType, savedTheme);
      return savedTheme;
    });
  }, [screenType]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const themeToggleHandler = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      bgImgSetter(screenType, newTheme);
      setDocumentTheme(newTheme);
      return newTheme;
    });
  };

  const bgImgSetter = (screenType, theme) => {
    setBgImg(() => {
      if (theme === "light") {
        return screenType === "desktop" ? bgDeskLight : bgMobileLight;
      } else {
        return screenType === "desktop" ? bgDeskDark : bgMobileDark;
      }
    });
  };

  const setDocumentTheme = (theme) =>
    (document.documentElement.className = theme);

  // listen for resize
  useEffect(() => {
    const debounceHandleResize = debounce(function handleResize() {
      const newScreenType = window.innerWidth < 700 ? "mobile" : "desktop";
      setScreenType(newScreenType);
      bgImgSetter(newScreenType, theme);
    }, 500);
    window.addEventListener("resize", debounceHandleResize);
    return (_) => {
      window.removeEventListener("resize", debounceHandleResize);
    };
  });
  /** end - THEME mgmt */

  /** TODOS state mgmt */
  const [todosState, setTodosState] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || [...staticData]
  );

  // Update localStorage when todosState changes
  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todosState));
  }, [todosState]);

  // Reset todos to static data provided by Frontend Mentor
  const resetHandler = () => {
    localStorage.removeItem("todo-list");
    setTodosState([...staticData]);
  };

  // Set complete => !complete for todo by id
  const onCompleteHandler = (id) => {
    setTodosState((prevState) => completeTodoLogic(prevState, id));
  };

  // Add todo
  const onAddHandler = (newTodo) => {
    setTodosState((prevState) => addTodoLogic(prevState, newTodo));
  };

  // Remove todo
  const onDeleteHandler = useCallback((id) => {
    setTodosState((prevState) => deleteTodoLogic(prevState, id));
  }, []);

  // Clear completed todos
  const clearCompletedHandler = () => {
    setTodosState((prevState) => clearCompletedLogic(prevState));
  };

  // Drag and drop callback
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
        <img src={bgImg} alt='background' />
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
      {
        screenType === "desktop" && (
          <footer>Drag and drop to reorder list</footer>
        ) /* React DnD doesn't work for touch devices */
      }
    </div>
  );
}

export default App;
