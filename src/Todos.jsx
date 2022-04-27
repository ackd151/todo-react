import React, { useState } from "react";
import Todo from "./Todo";
import TodosStatus from "./TodosStatus";
import { calculateItemsLeft } from "./utils/todoUtils";

import "./Todos.css";

const Todos = ({ todos, onCheck, onDelete, onClear }) => {
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
    <div className='todos-block'>
      {/* must be a better way... */}
      {todos.map((todo) => {
        const comp = (
          <Todo
            key={todo.id}
            todo={todo}
            onCheck={() => onCheck(todo.id)}
            onDelete={() => onDelete(todo.id)}
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
      <TodosStatus
        filter={filter}
        onFilterSelect={filterSelectHandler}
        counter={counterText}
        onClear={onClear}
      />
    </div>
  );
};

export default Todos;
