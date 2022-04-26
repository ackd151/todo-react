import React from "react";
import Checkbox from "./Checkbox";

import "./Todo.css";

const Todo = ({ todo, onCheck }) => {
  //   console.log(todo.complete);

  return (
    <div className='todo-item'>
      <div className='todo-data'>
        <Checkbox checked={todo.complete} onCheck={onCheck} />
        <div className={`todo-content ${todo.complete ? "complete" : ""}`}>
          {todo.content}
        </div>
      </div>
    </div>
  );
};

export default Todo;
