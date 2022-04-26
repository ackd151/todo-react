import React from "react";

import Checkbox from "./Checkbox";
import "./NewTodo.css";

const NewTodo = () => {
  return (
    <div className='new-todo_block'>
      <Checkbox />
      <input
        type='text'
        className='new-todo_input'
        placeholder='Create a new todo...'
      />
    </div>
  );
};

export default NewTodo;
