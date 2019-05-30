import React, { Component } from "react";

class FilterWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFilter: false,
      filterOrderOptions: ["ASC", "DESC"]
    };
    this.displayFilter = this.displayFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(e) {
    console.log(e.target.value);
    if (e.target.value === "jobId" || e.target.value === "date") {
      this.setState({
        filterOrderOptions: ["ASC", "DESC"]
      });
    } else if (e.target.value === "property") {
      this.setState({
        filterOrderOptions: ["2600 Dels Lane", "417 Wolfe Ave", "419 Wolfe Ave"]
      });
    }
  }

  displayFilter() {
    if (this.state.displayFilter) {
      return (
        <div className="filter-main">
          <div className="filter-select">
            <select onChange={this.handleFilterChange} className="filter-type">
              <option value="jobId">Job Id</option>
              <option value="property">Property</option>
              <option value="date">Date</option>
            </select>
            <select className="filter-order">
              {this.state.filterOrderOptions.map((filterOption, index) => {
                return (
                  <option key={filterOption + index} value={filterOption}>
                    {filterOption}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="filter-controls">
            <button className="filter-control-button">
              <i className="fas fa-check" />
            </button>
            <button
              onClick={() => this.setState({ displayFilter: false })}
              className="filter-control-button"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="work-order-filter">
        <div className="filter-header">
          <h5>Filters</h5>
        </div>
        <div className="filter-container">
          <div className="filter-add">
            <button
              onClick={() => this.setState({ displayFilter: true })}
              className="filter-add-button"
            >
              <i className="fas fa-filter" /> Add Filter
            </button>
          </div>
          {this.displayFilter()}
        </div>
      </div>
    );
  }
}

export default FilterWorkOrder;
