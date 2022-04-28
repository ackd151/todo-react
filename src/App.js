import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import NewTodo from "./NewTodo";
import Todos from "./Todos";

import bgDeskLight from "./assets/bg-desktop-light.jpg";
import bgDeskDark from "./assets/bg-desktop-dark.jpg";
import bgMobileLight from "./assets/bg-mobile-light.jpg";
import bgMobileDark from "./assets/bg-mobile-dark.jpg";

import { getNewId } from "./utils/todoUtils";

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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    console.log(localStorage.getItem("theme"));
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

  const [bgImg, setBgImg] = useState(bgDeskLight);
  const bgImgSetter = (screenType, theme) => {
    setBgImg(() => {
      if (theme === "light") {
        // console.log("light");
        return screenType === "desktop" ? bgDeskLight : bgMobileLight;
      } else {
        // console.log("dark");
        return screenType === "desktop" ? bgDeskDark : bgMobileDark;
      }
    });
  };

  const setDocumentTheme = (theme) =>
    (document.documentElement.className = theme);

  // listen for resize
  const [screenType, setScreenType] = useState(
    window.innerWidth < 700 ? "mobile" : "desktop"
  );
  console.log(screenType);
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
      {screenType === "desktop" && (
        <footer>Drag and drop to reorder list</footer>
      )}
    </div>
  );
}

export default App;
