import React, { Component } from 'react';
import PropertySearch from '../PropertySearch/PropertySearch';
import { Link } from 'react-router-dom';
import PropertyWizard from '../PropertyAddWizard/PropertyWizard';
class PropertyView extends Component {
    constructor() {
        super();
        this.state = {
            searchProperty: true,
            addProperty: false,
            wizardStep: 'property-img'
        }
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.renderBasedOnMenuType = this.renderBasedOnMenuType.bind(this);
    }

    toggleActiveTab() {
        this.setState({
            searchProperty: !this.state.searchProperty,
            addProperty: !this.state.addProperty
        });
    }
    renderBasedOnMenuType() {
        if (this.state.searchProperty) {
            return <PropertySearch />
        }
        else {
            return <PropertyWizard />
        }
    }
    r
    render() {
        return (
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
                <div className="property-list-container">
                    <div className="property-header">
                        <h3>Properties</h3>
                        <h6>15 Properties</h6>
                    </div>
                    <div className="property-list">
                        <div className="property">
                            <div className="property-img">
                                <img src="https://res.cloudinary.com/dg47ewvdp/image/upload/v1538814467/luxrbppe2cpclztlbigy.jpg" alt="property-img" />
                            </div>
                            <div className="property-details">
                                <div className="property-address">
                                    <h5>Address</h5>
                                    <p>Street: 2600 Dels Lane</p>
                                    <p>City: Turlock</p>
                                    <p>State: California</p>
                                    <p>Zipcode: 95382</p>
                                </div>
                                <div className="property-rent">
                                    <h5>Finances</h5>
                                    <p>Rent: $5000</p>
                                </div>
                                <div className="property-tenants">
                                    <h5>Tenant Information</h5>
                                    <p> Name: Alan Ibarra</p>
                                    <p> Phone: 209-632-3150</p>
                                    <p> Email: alan.ibarra209@gmail.com</p>
                                </div>
                                <div className="property-actions">
                                    <div className="action">
                                        <i className="fa fa-edit"></i>
                                    </div>
                                    <div className="action">
                                        <i className="fa fa-trash"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyView;