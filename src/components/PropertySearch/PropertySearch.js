import React, { Component } from "react";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        property_city: "",
        property_state: "",
        property_zipcode: 0
      },
      uniqueStates: { length: 0 },
      uniqueCities: { length: 0 },
      uniqueZipcodes: { length: 0 }
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterProperties = this.filterProperties.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  componentDidMount() {
    this.parsePropertyList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.propertyList.length !== prevProps.propertyList.length) {
      this.parsePropertyList();
    }
  }
  /* 
        This method is going through the property list and extracting the unique
        cities states,and zipcodes and inserting them into their seperate arrays.  These
        arrays will serve as our search parameters.
    */
  parsePropertyList() {
    let { propertyList } = this.props;
    let states = { length: 0 };
    let cities = { length: 0 };
    let zipcodes = { length: 0 };
    for (let i = 0; i < propertyList.length; i++) {
      let { property_city, property_state, property_zipcode } = propertyList[i];
      if (!cities[property_city]) {
        cities[property_city] = property_city;
        cities.length += 1;
      }
      if (!states[property_state]) {
        states[property_state] = property_state;
        states.length += 1;
      }
      if (!zipcodes[property_zipcode]) {
        zipcodes[property_zipcode] = property_zipcode;
        zipcodes.length += 1;
      }
    }
    this.setState({
      uniqueCities: cities,
      uniqueStates: states,
      uniqueZipcodes: zipcodes
    });
  }

  /* 
      Description:  Takes an object and returns an array of <option> statements
      Input: {Turlock: "Turlock", Modesto: "Modesto", length: 2}
      outpur: 
        [
            <option>Turlock</option>
            <option>Modesto</option>
        ]
    */
  displayPropertyFilters(propertyFilter) {
    let arr = [];
    for (let prop in propertyFilter) {
      if (prop !== "length") {
        arr.push(
          <option key={propertyFilter[prop]}>{propertyFilter[prop]}</option>
        );
      }
    }
    return arr;
  }

  handleFilterChange(e) {
    // for the zipcode we want typcast the value into a number
    let filters = Object.assign({}, this.state.filters, {
      [e.target.name]:
        e.target.name === "property_zipcode" ? +e.target.value : e.target.value
    });
    this.setState({ filters });
  }
  /* 
        This is essentially the same thing as Object.keys.  The main difference is that
        I only want keys who have values
        EX:
            input: {city: "", state: "CA", zipcode: ""}
            Output: ["state"];
    */
  getFilterKeys(filterObj) {
    let arr = [];
    for (let prop in filterObj) {
      if (filterObj[prop]) {
        arr.push(prop);
      }
    }
    return arr;
  }

  filterProperties() {
    let filterKeys = this.getFilterKeys(this.state.filters);
    let filteredProperties = [];
    let keyFlag;
    for (let i = 0; i < this.props.propertyList.length; i++) {
      keyFlag = false;
      for (let j = 0; j < filterKeys.length; j++) {
        if (
          this.props.propertyList[i][filterKeys[j]] ===
          this.state.filters[filterKeys[j]]
        ) {
          keyFlag = true;
        } else {
          keyFlag = false;
          break;
        }
      }
      if (keyFlag) {
        filteredProperties.push(this.props.propertyList[i]);
      }
    }
    this.props.renderFilteredProperties(filteredProperties);
  }

  clearFilters() {
    let { filters } = this.state;
    if (
      filters.property_city ||
      filters.property_state ||
      filters.property_zipcode
    ) {
      filters = {};
      let filterMenus = document.querySelectorAll(".filterMenu");
      for (let i = 0; i < filterMenus.length; i++) {
        filterMenus[i].value = "";
      }
      this.props.clearFilteredProperties();
    }
  }

  render() {
    let { uniqueCities, uniqueStates, uniqueZipcodes } = this.state;
    return (
      <div>
        <div className="component-property-search">
          <div className="search-filter">
            <ul className="filter">
              <h5>City</h5>
              <select
                name="property_city"
                onChange={this.handleFilterChange}
                className="filterMenu"
              >
                <option value="" />
                {uniqueCities.length > 0
                  ? this.displayPropertyFilters(uniqueCities)
                  : null}
              </select>
            </ul>
            <ul className="filter">
              <h5>State</h5>
              <select
                name="property_state"
                onChange={this.handleFilterChange}
                className="filterMenu"
              >
                <option value="" />
                {uniqueStates.length > 0
                  ? this.displayPropertyFilters(uniqueStates)
                  : null}
              </select>
            </ul>
            <ul className="filter">
              <h5>Zipcode</h5>
              <select
                name="property_zipcode"
                onChange={this.handleFilterChange}
                className="filterMenu"
              >
                <option value="" />
                {uniqueZipcodes.length > 0
                  ? this.displayPropertyFilters(uniqueZipcodes)
                  : null}
              </select>
            </ul>
            <div className="search-button">
              <button onClick={this.filterProperties}>Search</button>
              <button onClick={this.clearFilters}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertySearch;
