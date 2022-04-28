import React from "react";
import Filters from "./Filters";

import "./TodosStatus.css";

const TodosStatus = ({ counter, onFilterSelect, filter, onClear }) => {
  return (
    <div className='todos-status-block'>
      <p className='items-left'>{counter}</p>
      <Filters
        filter={filter}
        onFilterSelect={onFilterSelect}
        displayClass={"desktop-filters"}
      />
      <div className='clear'>
        <button value={"clear"} onClick={onClear}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodosStatus;
