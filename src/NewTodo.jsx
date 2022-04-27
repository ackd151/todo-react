import React, { useState, useRef } from "react";
import Checkbox from "./Checkbox";

import "./NewTodo.css";

const NewTodo = ({ onCheck }) => {
  //   const placeHolder = "Create a new todo...";
  const [todoContent, setTodoContent] = useState("");

  const inputRef = useRef();

  const contentChangeHandler = (ev) => {
    setTodoContent(ev.target.value);
  };

  const onKeyDown = (ev) => {
    if (ev.key === "Enter") {
      onSubmitHandler();
    }
  };

  const onSubmitHandler = () => {
    if (todoContent.length === 0) {
      ////////// implement alert/validation
      return;
    }
    const newTodo = {
      content: todoContent,
      complete: false,
    };
    inputRef.current.blur();
    setTodoContent("");
    onCheck(newTodo);
  };

  return (
    <div className='new-todo_block'>
      <Checkbox onCheck={onSubmitHandler} />
      <input
        type='text'
        className='new-todo_input'
        placeholder='Create a new todo...'
        ref={inputRef}
        value={todoContent}
        onChange={contentChangeHandler}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default NewTodo;
