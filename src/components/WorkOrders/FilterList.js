import React from "react";

const FilterList = function() {
  return (
    <div className="filter-co">
      <select className="filter-select">
        <option value="">Job Id</option>
        <option value="">Property</option>
        <option value="">Date</option>
      </select>
      <div className="filter-buttons">
        <button>
          <i className="fa fa-check" />
        </button>
        <button>
          <i className="fa fa-times" />
        </button>
      </div>
    </div>
  );
};

export default FilterList;
