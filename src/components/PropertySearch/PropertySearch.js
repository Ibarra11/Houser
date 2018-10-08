import React from 'react';
/* 
    Keep track of what filters the user selects.
    Ex:
        filters = {property_city: Turlock, property_state: CA}

*/
let filters = {};

const PropertySearch = function ({ propertyList, renderFilteredProperties, clearFilteredProperties }) {
    function parsePropertyList() {
        let cities = [];
        let states = [];
        let zipCodes = [];
        for (let i = 0; i < propertyList.length; i++) {
            let { property_city, property_state, property_zipcode } = propertyList[i];
            if (!cities.includes(property_city)) {
                cities.push(property_city)
            }
            if (!states.includes(property_state)) {
                states.push(property_state);
            }
            if (!zipCodes.includes(property_zipcode)) {
                zipCodes.push(property_zipcode);
            }
        }
        return { cities, states, zipCodes };
    }

    function updateFilter(e, filter) {
        if (e.target.value) {
            if (filter === 'property_zipcode') {
                filters[filter] = parseInt(e.target.value);
            }
            else {
                filters[filter] = e.target.value;
            }
        }
        else {
            delete filters[filter];
        }
    }

    function filterProperties() {
        let keys = Object.keys(filters);
        if (keys.length > 0) {
            let filteredProperties = [];
            let keyFlag;
            for (let i = 0; i < propertyList.length; i++) {
                keyFlag = false;
                for (let j = 0; j < keys.length; j++) {
                    if (propertyList[i][keys[j]] === filters[keys[j]]) {
                        keyFlag = true;
                    }
                    else {
                        keyFlag = false;
                        break;
                    }
                }
                if (keyFlag) {
                    filteredProperties.push(propertyList[i]);
                }
            }
            renderFilteredProperties(filteredProperties);
        }
    }

    function clearFilters() {
        if (filters.property_city || filters.property_state || filters.property_zipcode) {
            filters = {};
            let filterMenus = document.querySelectorAll('.filterMenu');
            for (let i = 0; i < filterMenus.length; i++) {
                filterMenus[i].value = '';
            }
            clearFilteredProperties();
        }

    }

    let { cities, states, zipCodes } = parsePropertyList();
    return (
        <div className="component-property-search">
            <div className="search-filter">
                <ul className="filter">
                    <h5>City</h5>
                    <select className="filterMenu" onChange={e => updateFilter(e, 'property_city')}>
                        <option value=""></option>
                        {cities.length > 0 ? cities.map((city, index) => {
                            return <option key={city + index} value={city}>{city}</option>
                        }) : null}
                    </select>
                </ul>
                <ul className="filter">
                    <h5>State</h5>
                    <select className="filterMenu" onChange={e => updateFilter(e, 'property_state')}>
                        <option value=""></option>
                        {states.length > 0 ? states.map((state, index) => {
                            return <option key={state + index} value={state}>{state}</option>
                        }) : null}
                    </select>
                </ul>
                <ul className="filter">
                    <h5>Zipcode</h5>
                    <select className="filterMenu" onChange={e => updateFilter(e, 'property_zipcode')}>
                        <option value=""></option>
                        {zipCodes.length > 0 ? zipCodes.map((zipCode, index) => {
                            return <option key={zipCode + index} value={zipCode}>{zipCode}</option>
                        }) : null}
                    </select>
                </ul>
                <div className="search-button">
                    <button onClick={filterProperties}>Search</button>
                    <button onClick={clearFilters}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default PropertySearch;