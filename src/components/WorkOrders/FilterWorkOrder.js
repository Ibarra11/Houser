import React, { Component } from "react";
import FilterList from "./FilterList";
class FilterWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFilter: false,
      filterType: "",
      filterOrderOptions: [],
      filterOrderOption: "",
      filterList: {}
    };
    this.displayFilter = this.displayFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFilterOrder = this.handleFilterOrder.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.hideFilter = this.hideFilter.bind(this);
  }

  handleFilterChange(e) {
    console.log(e.target.value);
    if (!e.target) {
      e.target.value = e;
    }
    if (e.target.value === "Job Id" || e.target.value === "Date") {
      this.setState({
        filterType: e.target.value,
        filterOrderOptions: ["ASC", "DESC"],
        filterOrderOption: ""
      });
    } else {
      let address = "";
      let addressListLookup = {};
      let addressList = [];
      this.props.properties.forEach(property => {
        address = `${property.property_street} ${property.property_city}, ${
          property.property_state
        } ${property.property_zipcode}`;
        if (!addressListLookup[address]) {
          addressList.push(address);
          addressListLookup[address] = 1;
        }
      });
      this.setState({
        filterType: "Property",
        filterOrderOptions: addressList,
        filterOrderOption: ""
      });
    }
  }

  handleFilterOrder(e) {
    this.setState({
      filterOrderOption: e.target.value
    });
  }

  removeFilter(filterType) {
    let filterListCopy = this.state.filterList;
    delete filterListCopy[filterType];
    this.setState({
      FilterList: filterListCopy
    });
  }

  updateFilter(filterType) {
    console.log(filterType);
    let fakeEventObj = {};
    fakeEventObj.target = { value: filterType };
    this.setState(
      {
        displayFilter: true,
        filterType
      },
      this.handleFilterChange(fakeEventObj)
    );
  }

  addFilter() {
    if (this.state.filterOrderOption) {
      let { filterType, filterOrderOption } = this.state;
      let filterListCopy = Object.assign(
        { [filterType]: filterOrderOption },
        this.state.filterList
      );
      this.setState(
        {
          displayFilter: false,
          filterType: "",
          filterOrderOptions: [],
          filterOrderOption: "",
          filterList: filterListCopy
        },
        this.props.toggleFilter(
          this.state.filterType,
          this.state.filterOrderOption
        )
      );
    }
  }

  displayFilter() {
    if (this.state.displayFilter) {
      let { filterType, filterList } = this.state;
      return (
        <div className="filter-main">
          <div className="filter-select">
            <select onChange={this.handleFilterChange} className="filter-type">
              <option value={this.state.filterType}>
                {this.state.filterType}
              </option>
              {filterType !== "Job Id" && !filterList["Job Id"] ? (
                <option value="Job Id">Job Id</option>
              ) : null}
              {this.state.filterType !== "Date" && !filterList["Date"] ? (
                <option value="Date">Date</option>
              ) : null}
              {this.state.filterType !== "Property" &&
              !filterList["Property"] ? (
                <option value="Property">Property</option>
              ) : null}
            </select>
            <select onChange={this.handleFilterOrder} className="filter-order">
              <option value={this.state.filterOrderOption}>
                {this.state.filterOrderOption}
              </option>
              {this.state.filterOrderOptions.map((filterOption, index) => {
                if (filterOption !== this.state.filterOrderOption) {
                  return (
                    <option key={filterOption + index} value={filterOption}>
                      {filterOption}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="filter-controls">
            <button onClick={this.addFilter} className="filter-control-button">
              <i className="fas fa-check" />
            </button>
            <button onClick={this.hideFilter} className="filter-control-button">
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      );
    }
  }

  hideFilter() {
    if (this.state.filterList[this.state.filterType]) {
      this.setState({
        displayFilter: false,
        filterType: "",
        filterOrderOptions: []
      });
    } else {
      this.setState({
        displayFilter: false
      });
    }
  }

  render() {
    return (
      <div className="work-order-filter">
        <div className="filter-header">
          <h3>Filters</h3>
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
          <FilterList
            removeFilter={this.removeFilter}
            updateFilter={this.updateFilter}
            list={this.state.filterList}
          />
        </div>
      </div>
    );
  }
}

export default FilterWorkOrder;
