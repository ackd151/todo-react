import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Checkbox from "./Checkbox";
import { ReactComponent as DeleteIcon } from "./assets/icon-cross.svg";
import "./Todo.css";

const Todo = ({ todo, idx, onCheck, onDelete, moveTodo }) => {
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.idx;
      const hoverIndex = idx;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveTodo(dragIndex, hoverIndex);
      item.idx = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <div className='todo-item' ref={dragDropRef}>
      <div className={`todo-content ${todo.complete ? "complete" : ""}`}>
        <Checkbox checked={todo.complete} onCheck={onCheck} />
        <p onClick={onCheck}>
          {todo.content} {todo.id}
        </p>
      </div>
      <DeleteIcon
        className='delete-icon'
        alt='remove todo'
        onClick={onDelete}
      />
    </div>
  );
};

export default Todo;
