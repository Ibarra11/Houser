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
        this.updatePropertyList = this.updatePropertyList.bind(this);
    }

    componentDidMount() {
        this.getProperties();
    }

    toggleActiveTab() {
        this.setState({
            searchProperty: !this.state.searchProperty,
            addProperty: !this.state.addProperty
        });
    }

    getProperties() {
        axios.get('/api/property')
            .then(res => this.setState({ propertyList: res.data }))
            .catch(err => console.log(err))
    }

    // This method will make it so that when a property is added, it will
    // cause this component to re-render, and thus get all the properties from
    // the server
    updatePropertyList() {
        this.getProperties();
    }

    renderBasedOnMenuType() {
        if (this.state.searchProperty) {
            return <PropertySearch />
        }
        else {
            return <PropertyWizard updatePropertyList={this.updatePropertyList} />
        }
    }
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
                        <div className="header-title">
                            <h3>Properties</h3>
                            <h6>( {this.state.propertyList.length} Properties )</h6>
                        </div>


                        <div className="pagination">
                            <div className="pagination-button"><i className="fa fa-chevron-circle-left"></i></div>
                            <div className="page-count">
                                <p>1 of 10</p>
                            </div>
                            <div className="pagination-button"><i className="fa fa-chevron-circle-right"></i></div>
                        </div>
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