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
                <div className="property-list">
                    <div className="property-header">
                        <h3>Properties</h3>
                        <h6>15 Properties</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyView;