import React from "react";

import "./Filters.css";

const Filters = ({ displayClass, filter, onFilterSelect }) => {
  return (
    <div className={`filters ${displayClass}`}>
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
  );
};

export default Filters;
