import React, { Component } from 'react';
import PropertySearch from '../PropertySearch/PropertySearch';
import PropertyWizard from '../PropertyAddWizard/PropertyWizard';
import PropertyList from './PropertyList';
import Pagination from '../../utilities/Pagination';
import axios from 'axios';
class PropertyView extends Component {
    constructor() {
        super();
        this.state = {
            searchProperty: true,
            addProperty: false,
            wizardStep: 'property-img',
            propertyList: [],
            filtredPropertyList: [],
            propertiesOnPage: []
        }

        // These are for the pagination
        this.paginationInstance = new Pagination([], 5);
        this.currentPage = 1;

        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.renderBasedOnMenuType = this.renderBasedOnMenuType.bind(this);
        this.updatePropertyList = this.updatePropertyList.bind(this);
        this.updatePageItems = this.updatePageItems.bind(this);
        this.renderFilteredProperties = this.renderFilteredProperties.bind(this);
        this.clearFilteredProperties = this.clearFilteredProperties.bind(this);
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
            .then(res => {
                this.paginationInstance.itemList = res.data;
                this.paginationInstance.calculateNumOfPages();
                let pageItems = this.paginationInstance.displayItemsOnPage(this.currentPage);
                this.setState({ propertyList: res.data, propertiesOnPage: pageItems });
                // this.renderBasedOnMenuType();
            })
            .catch(err => console.log(err))
    }

    // This method will make it so that when a property is added, it will
    // cause this component to re-render, and thus get all the properties from
    // the server
    updatePropertyList() {
        this.getProperties();
    }

    updatePageItems() {
        let pageItems = this.paginationInstance.displayItemsOnPage(this.currentPage);
        this.setState({
            propertiesOnPage: pageItems
        })
    }

    updateCurrentPage(direction) {
        if (direction === 'next') {
            if (this.currentPage < this.paginationInstance.numberOfPages) {
                this.currentPage++;
                this.updatePageItems();
            }
        }
        else if (direction === 'prev') {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePageItems();
            }
        }

    }

    clearFilteredProperties(){
        this.paginationInstance.itemList = this.state.propertyList;
        this.currentPage = 1;
        this.paginationInstance.calculateNumOfPages();
        this.updatePageItems();
    }

    renderFilteredProperties(propertyList) {
        this.paginationInstance.itemList = propertyList;
        this.paginationInstance.calculateNumOfPages();
        this.currentPage = 1;
        this.updatePageItems();
    }

    renderBasedOnMenuType() {
        if (this.state.searchProperty) {

            return <PropertySearch clearFilteredProperties={this.clearFilteredProperties} renderFilteredProperties={this.renderFilteredProperties} propertyList={this.state.propertyList} />
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
                            <h6>( {this.paginationInstance.itemList.length} Properties )</h6>
                        </div>
                        <div className="pagination">
                            <div onClick={() => this.updateCurrentPage('prev')} className="pagination-button"><i className="fa fa-chevron-circle-left"></i></div>
                            <div className="page-count">
                                <p>{this.currentPage} of {this.paginationInstance.numberOfPages}</p>
                            </div>
                            <div onClick={() => this.updateCurrentPage('next')} className="pagination-button"><i className="fa fa-chevron-circle-right"></i></div>
                        </div>
                    </div>

                    <div className="property-list">
                        <PropertyList propertyList={this.state.propertiesOnPage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyView;