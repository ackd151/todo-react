import React from "react";

import "./FilterButton.css";

const FilterButton = ({ filter, onFilterSelect, filterTag }) => {
  return (
    <button
      className={`filter ${filter === filterTag ? "selected" : ""}`}
      value={filterTag}
      onClick={() => onFilterSelect(filterTag)}
    >
      {filterTag}
    </button>
  );
};

export default FilterButton;
