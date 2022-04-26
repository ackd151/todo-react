// Count unfinished todos
export const calculateItemsLeft = (todos) => {
  return todos.reduce((acc, todo) => {
    return acc + (todo.complete ? 0 : 1);
  }, 0);
};

// Get ID for new todo
export const getNewId = (todos) => {
  let max = 0;
  for (const todo of todos) {
    max = Math.max(max, todo.id);
  }
  return ++max;
};
