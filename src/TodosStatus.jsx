import React, { useState } from "react";

import "./TodosStatus.css";

const TodosStatus = ({ itemsLeft, onFilterSelect, onClear }) => {
  const [filter, setFilter] = useState("all");

  return (
    <div className='todos-status-block'>
      <p className='items-left'>{`${itemsLeft} items left`}</p>
      <div className='filters'>
        <button
          className={`filter ${filter === "all" ? "selected" : ""}`}
          value={"all"}
        >
          All
        </button>
        <button
          className={`filter ${filter === "active" ? "selected" : ""}`}
          value={"active"}
        >
          Active
        </button>
        <button
          className={`filter ${filter === "completed" ? "selected" : ""}`}
          value={"completed"}
        >
          Completed
        </button>
      </div>
      <div className='clear'>
        <button value={"clear"}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TodosStatus;
