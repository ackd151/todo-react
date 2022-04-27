import React from "react";
import Checkbox from "./Checkbox";
import { ReactComponent as DeleteIcon } from "./assets/icon-cross.svg";
import "./Todo.css";

const Todo = ({ todo, onCheck, onDelete }) => {
  return (
    <div className='todo-item'>
      <div className='todo-data'>
        <Checkbox checked={todo.complete} onCheck={onCheck} />
        <div className={`todo-content ${todo.complete ? "complete" : ""}`}>
          <p onClick={onCheck}>
            {todo.content} {todo.id}
          </p>
          <DeleteIcon
            className='delete-icon'
            alt='remove todo'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
