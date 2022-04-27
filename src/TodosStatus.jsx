import React from "react";

import "./TodosStatus.css";

const TodosStatus = ({ counter, onFilterSelect, filter, onClear }) => {
  return (
    <div className='todos-status-block'>
      <p className='items-left'>{counter}</p>
      <div className='filters'>
        <button
          className={`filter ${filter === "all" ? "selected" : ""}`}
          value={"all"}
          onClick={() => onFilterSelect("all")}
        >
          All
        </button>
        <button
          className={`filter ${filter === "active" ? "selected" : ""}`}
          value={"active"}
          onClick={() => onFilterSelect("active")}
        >
          Active
        </button>
        <button
          className={`filter ${filter === "completed" ? "selected" : ""}`}
          value={"completed"}
          onClick={() => onFilterSelect("completed")}
        >
          Completed
        </button>
      </div>
      <div className='clear'>
        <button value={"clear"} onClick={onClear}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodosStatus;
