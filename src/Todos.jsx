import React from "react";
import Todo from "./Todo";
import TodosStatus from "./TodosStatus";
import { calculateItemsLeft } from "./utils/todoUtils";

import "./Todos.css";

const Todos = ({ todos, onCheck }) => {
  return (
    <div className='todos-block'>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheck={() => onCheck(todo.id)} />
      ))}
      <TodosStatus itemsLeft={calculateItemsLeft(todos)} />
    </div>
  );
};

export default Todos;
