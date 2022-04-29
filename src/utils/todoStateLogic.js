import { getNewId } from "./todoUtils";

const addTodoLogic = (prevState, newTodo) => {
  newTodo.id = getNewId(prevState);
  prevState.push(newTodo);
  return [...prevState];
};

const completeTodoLogic = (prevState, id) => {
  const newState = prevState.map((todo) => {
    if (todo.id === id) {
      return { ...todo, complete: !todo.complete };
    }
    return { ...todo };
  });
  return [...newState];
};

const deleteTodoLogic = (prevState, id) => {
  let idx = null;
  for (const i in prevState) {
    if (prevState[i].id === id) {
      idx = i;
    }
  }
  if (idx) {
    prevState.splice(idx, 1);
    return [...prevState];
  }
  console.log("Uh oh, shouldn't be here...");
  return [...prevState];
};

const clearCompletedLogic = (prevState) => {
  const newState = prevState.filter((todo) => !todo.complete);
  return [...newState];
};

export {
  addTodoLogic,
  completeTodoLogic,
  deleteTodoLogic,
  clearCompletedLogic,
};
