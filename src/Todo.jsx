import React from "react";
import Checkbox from "./Checkbox";

import "./Todo.css";

const Todo = ({ todo, onCheck }) => {
  console.log(todo.complete);

  const onCheckHandler = () => {
    onCheck(todo);
  };

  return (
    <div className='todo-item'>
      <div className='todo-data'>
        <Checkbox completed={todo.complete} onCheck={onCheckHandler} />
        <div className='todo-content'>{todo.content}</div>
      </div>
    </div>
  );
};

export default Todo;
