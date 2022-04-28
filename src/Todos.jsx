import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Todo from "./Todo";
import TodosStatus from "./TodosStatus";
import Filters from "./Filters";
import { calculateItemsLeft } from "./utils/todoUtils";

import "./Todos.css";

const Todos = ({ todos, onCheck, onDelete, onClear, moveTodo }) => {
  /** FILTER state mgmt */
  const [filter, setFilter] = useState("all");

  const filterSelectHandler = (fVal) => {
    setFilter(fVal);
  };

  const numLeft = calculateItemsLeft(todos);
  const counterText =
    filter === "completed"
      ? `${todos.length - numLeft} completed item${
          todos.length - numLeft !== 1 ? "s" : ""
        }`
      : filter === "active"
      ? `${numLeft} active item${numLeft !== 1 ? "s" : ""}`
      : `${numLeft} item${numLeft !== 1 ? "s" : ""} left`;

  return (
    <React.Fragment>
      <div className='todos-block'>
        <DndProvider backend={HTML5Backend}>
          {/* must be a better way... (to filter)*/}
          {todos.map((todo, idx) => {
            const comp = (
              <Todo
                key={todo.id}
                idx={idx}
                todo={todo}
                onCheck={() => onCheck(todo.id)}
                onDelete={() => onDelete(todo.id)}
                moveTodo={moveTodo}
              />
            );
            if (filter === "completed") {
              return todo.complete && comp;
            } else if (filter === "active") {
              return !todo.complete && comp;
            } else {
              return comp;
            }
          })}
        </DndProvider>
        <TodosStatus
          filter={filter}
          onFilterSelect={filterSelectHandler}
          counter={counterText}
          onClear={onClear}
        />
      </div>
      <Filters
        displayClass='mobile-filters'
        filter={filter}
        onFilterSelect={filterSelectHandler}
      />
    </React.Fragment>
  );
};

export default Todos;
