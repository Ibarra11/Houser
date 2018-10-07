import React from 'react';
const PropertySearch = function ({ propertyList }) {
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

    let { cities, states, zipCodes } = parsePropertyList();

    return (
        <div className="component-property-search">
            <div className="search-filter">
                <ul className="filter">
                    <h5>City</h5>
                    <select>
                        <option value=""></option>
                        {cities.length > 0 ? cities.map((city, index) => {
                            return <option key={city + index} value={city}>{city}</option>
                        }) : null}
                    </select>
                </ul>
                <ul className="filter">
                    <h5>State</h5>
                    <select>
                        <option value=""></option>
                        {states.length > 0 ? states.map((state, index) => {
                            return <option key={state + index} value={state}>{state}</option>
                        }) : null}
                    </select>
                </ul>
                <ul className="filter">
                    <h5>Zipcode</h5>
                    <select>
                        <option value=""></option>
                        {zipCodes.length > 0 ? zipCodes.map((zipCode, index) => {
                            return <option key={zipCode + index} value={zipCode}>{zipCode}</option>
                        }) : null}
                    </select>
                </ul>
                <div className="search-button">
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default PropertySearch;