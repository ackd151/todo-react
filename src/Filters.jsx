import React from "react";
import FilterButton from "./FilterButton";

import "./Filters.css";

const Filters = ({ displayClass, filter, onFilterSelect }) => {
  return (
    <div className={`filters ${displayClass}`}>
      <FilterButton
        filter={filter}
        onFilterSelect={onFilterSelect}
        filterTag='all'
      />
      <FilterButton
        filter={filter}
        onFilterSelect={onFilterSelect}
        filterTag='active'
      />
      <FilterButton
        filter={filter}
        onFilterSelect={onFilterSelect}
        filterTag='completed'
      />
    </div>
  );
};

export default Filters;
