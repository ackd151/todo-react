import React, { useState } from "react";
import Checkbox from "./Checkbox";

import "./NewTodo.css";

const NewTodo = ({ onCheck }) => {
  const placeHolder = "Create a new todo...";
  const [todoContent, setTodoContent] = useState(placeHolder);

  const contentChangeHandler = (ev) => {
    setTodoContent(ev.target.value);
  };
  const focusHandler = () => {
    setTodoContent("");
  };

  const onSubmitHandler = () => {
    const newTodo = {
      content: todoContent,
      complete: false,
    };
    setTodoContent(placeHolder);
    onCheck(newTodo);
  };

  return (
    <div className='new-todo_block'>
      <Checkbox onCheck={onSubmitHandler} />
      <input
        type='text'
        className='new-todo_input'
        // placeholder='Create a new todo...'
        onFocus={focusHandler}
        value={todoContent}
        onChange={contentChangeHandler}
      />
    </div>
  );
};

export default NewTodo;
