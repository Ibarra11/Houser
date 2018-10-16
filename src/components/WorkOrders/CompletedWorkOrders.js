import React, { Component } from 'react';
import axios from 'axios';
import Pagination from '../../utilities/Pagination';
class CompletedWorkOrders extends Component {
    constructor() {
        super();
        this.state = {
            workOrderList: [],
            workOrdersOnPage: []
        }

        this.paginationInstance = new Pagination([], 6);
        this.currentPage = 1;

        this.getCompletedWorkOrders = this.getCompletedWorkOrders.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
        this.renderWorkOrderList = this.renderWorkOrderList.bind(this);
    }

    componentDidMount() {
        this.getCompletedWorkOrders();
    }

    getCompletedWorkOrders() {
        axios.get('/api/work_orders/completed')
            .then(res => {
                if (res.data.length > 0) {
                    this.paginationInstance.itemList = res.data;
                    this.paginationInstance.calculateNumOfPages();
                    let pageItems = this.paginationInstance.displayItemsOnPage(this.currentPage);
                    this.setState({ workOrderList: res.data, workOrdersOnPage: pageItems })
                }
            })
            .catch(err => console.log(err))
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

    updatePageItems() {
        let pageItems = this.paginationInstance.displayItemsOnPage(this.currentPage);
        this.setState({
            currentWorkOrders: pageItems
        })

    }

    renderWorkOrderList() {
        if (this.state.workOrdersOnPage.length > 0) {
            let { workOrdersOnPage } = this.state;
            let workOrdArr = [];
            for (let i = 0; i < workOrdersOnPage.length; i++) {
                let { property_street, property_state, property_city, property_zipcode } = workOrdersOnPage[i];
                let workOrder =
                    <div key={workOrdersOnPage[i].job_id} className="job-card">
                        <div className="card-img-header">
                            <img src={workOrdersOnPage[i].property_img} alt="property img" />
                            <div className="card-overlay">
                                <div className="job-id">
                                    <h5> Job #{workOrdersOnPage[i].job_id}</h5>
                                </div>
                                <div className="property-address">
                                    <p>{property_street}, {property_city}, {property_state} {property_zipcode}</p>
                                </div>
                                <div className="card-controls">
                                    <i className="fa fa-eye"></i>
                                    <i className="fa fa-edit"></i>
                                    <i className="fa fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                workOrdArr.push(workOrder);
            }
            return workOrdArr;
        }
        else {
            return;
        }
    }

    render() {
        return (
            <div className="completed-jobs">
                <div className="job-header">
                    <h4>Completed Work Orders</h4>
                </div>
                <div className="completed-jobs-container">
                    {this.renderWorkOrderList()}
                </div>
                <div className="pagination">
                    <div onClick={() => this.updateCurrentPage('prev')} className="pagination-button"><i className="fa fa-chevron-circle-left"></i></div>
                    <div className="page-count">
                        <p>{this.currentPage} of {this.paginationInstance.numberOfPages}</p>
                    </div>
                    <div onClick={() => this.updateCurrentPage('next')} className="pagination-button"><i className="fa fa-chevron-circle-right"></i></div>
                </div>
            </div>
        )
    }
}

export default CompletedWorkOrders;