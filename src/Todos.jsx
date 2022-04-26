import React, { useState } from "react";
import Todo from "./Todo";
import TodosStatus from "./TodosStatus";

import "./Todos.css";

// Static dev-data
import { todos } from "./devData";

const calculateItemsLeft = (todos) => {
  return todos.reduce((acc, todo) => {
    return acc + (todo.complete ? 0 : 1);
  }, 0);
};

const Todos = () => {
  const [itemsLeft, setItemsLeft] = useState(calculateItemsLeft(todos));
  const [todosState, setTodosState] = useState(todos);

  const onCheckHandler = (todo) => {
    console.log("CHECK", todo);
    setTodosState((prevState) => {
      const newState = [...prevState];
      for (const idx in newState) {
        if (newState[idx].id === todo.id) {
          newState[idx].complete = !newState[idx].complete;
          console.log(newState[idx]);
        }
      }
      setItemsLeft(calculateItemsLeft(newState));
      return newState;
    });
  };

  return (
    <div className='todos-block'>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheck={onCheckHandler} />
      ))}
      <TodosStatus itemsLeft={itemsLeft} />
    </div>
  );
};

export default Todos;
