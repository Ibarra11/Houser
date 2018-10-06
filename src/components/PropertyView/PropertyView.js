import React, { Component } from 'react';
import PropertySearch from '../PropertySearch/PropertySearch';
import PropertyWizard from '../PropertyAddWizard/PropertyWizard';
import PropertyList from './PropertyList';
import axios from 'axios';
class PropertyView extends Component {
    constructor() {
        super();
        this.state = {
            searchProperty: true,
            addProperty: false,
            wizardStep: 'property-img',
            propertyList: []
        }
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.renderBasedOnMenuType = this.renderBasedOnMenuType.bind(this);
    }

    componentDidMount() {
        axios.get('/api/property')
            .then(res => this.setState({ propertyList: res.data }))
            .catch(err => console.log(err))
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
                        <PropertyList propertyList={this.state.propertyList} />
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyView;