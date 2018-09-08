import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="component-home">
                <nav className="nav">
                    <div className="navbar-logo">
                        <h2>Houser</h2>
                    </div>
                    <ul className="nav-links">
                        <li className="link">Properties</li>
                        <li className="link">Jobs</li>
                        <li className="link">Messages</li>
                        <li className="link">Transactions</li>
                        <li className="link">Logout</li>
                    </ul>
                </nav>
                <div className="property-view">
                    <div className="property-controls">
                        <div className="search">
                            <h4>Property Search</h4>
                            <div className="search-filter">
                                <ul className="filter">
                                    <h5>Type</h5>
                                    <select>
                                        <option value=""></option>
                                        <option value="house">House</option>
                                        <option value="apartment">Apartment</option>
                                    </select>
                                </ul>
                                <ul className="filter">
                                    <h5>Year</h5>
                                    <select>
                                        <option value=""></option>
                                        <option value="turlock">2012</option>
                                        <option value="modesto">2015</option>
                                    </select>
                                </ul>
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
                                <div className="search-button">
                                    <button>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="property-list">
                        <div className="property-header">
                            <h3>Properties</h3>
                            <h6>15 Properties</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;