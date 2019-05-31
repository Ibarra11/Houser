import React from "react";

const FilterItem = function({ filter }) {
  console.log(filter);
  return (
    <div className="filter-item">
      <div className="filter-type">
        <h5>{filter.filterType}</h5>
      </div>
      <div className="filter-order">
        <h5>{filter.filterOrder}</h5>
      </div>
      <div className="filter-actions">
        <button className="filter-remove">
          <h5>
            {" "}
            <i className="fas fa-times" />
          </h5>
        </button>
      </div>
    </div>
  );
};

export default FilterItem;
