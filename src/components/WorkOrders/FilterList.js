import React from "react";
import FilterItem from "./FilterItem";
const FilterList = function({ list }) {
  console.log(list);
  let filters = [];
  for (let filter in list) {
    filters.push({ filterType: filter, filterOrder: list[filter] });
  }
  return (
    <div className="filter-list">
      <div className="filter-list-headers">
        <div className="filter-type">
          <h4>Type</h4>
        </div>
        <div className="filter-order">
          <h4>Order By</h4>
        </div>
        <div className="filter-actions">
          <h4>Actions</h4>
        </div>
      </div>
      {filters.map(filter => {
        return <FilterItem key={filter.filterType} filter={filter} />;
      })}
    </div>
  );
};

export default FilterList;
