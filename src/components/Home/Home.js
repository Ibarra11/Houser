import React, { Component } from 'react';
import PropertySearch from '../PropertySearch/PropertySearch';

import PropertyWizard from '../PropertyAddWizard/PropertyWizard';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchProperty: true,
            addProperty: false,
            wizardStep: 'property-img'
        }
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.renderBasedOnMenuType = this.renderBasedOnMenuType.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    toggleActiveTab() {
        this.setState({
            searchProperty: !this.state.searchProperty,
            addProperty: !this.state.addProperty
        });
    }

    onDrop() {

    }
    renderBasedOnMenuType() {
        if (this.state.searchProperty) {
           return <PropertySearch />
        }
        else {
            return <PropertyWizard />
        }
    }

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
                        <div className="controls-menu">
                            <div onClick={this.searchProperty ? null : this.toggleActiveTab} className={this.state.searchProperty ? "menu-tab active" : "menu-tab"}>
                                Search Properties
                            </div>
                            <div onClick={this.addProperty ? null : this.toggleActiveTab} className={this.state.addProperty ? "menu-tab active" : "menu-tab"}>
                                Add Property
                            </div>
                        </div>
                        {this.renderBasedOnMenuType()}
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