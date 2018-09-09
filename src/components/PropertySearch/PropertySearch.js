import React, { Component } from 'react';

class PropertySearch extends Component {
    render() {
        return (
            <div className="component-property-search">
                <div className="search-filter">
                    <ul className="filter">
                        <h5>City</h5>
                        <select>
                            <option value=""></option>
                            <option value="turlock">Turlock</option>
                            <option value="modesto">Modesto</option>
                        </select>
                    </ul>
                    <ul className="filter">
                        <h5>State</h5>
                        <select>
                            <option value=""></option>
                            <option value="turlock">California</option>
                            <option value="modesto">Utah</option>
                        </select>
                    </ul>
                    <ul className="filter">
                        <h5>Zipcode</h5>
                        <select>
                            <option value=""></option>
                            <option value="turlock">California</option>
                            <option value="modesto">Utah</option>
                        </select>
                    </ul>
                    <div className="search-button">
                        <button>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertySearch;