import React, { Component } from 'react';
import axios from 'axios';
import Pagination from '../../utilities/Pagination';
import moment from 'moment';
class WorkOrderQueue extends Component {
    constructor() {
        super();
        this.state = {
            workOrders: [],
            currentWorkOrders: []
        }

        this.paginationInstance = new Pagination([], 5);
        this.currentPage = 1;
        this.getWorkOrdersFromQueue = this.getWorkOrdersFromQueue.bind(this);
        this.renderWorkOrders = this.renderWorkOrders.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
        this.removeFromQueue = this.removeFromQueue.bind(this);
    }
    componentDidMount() {
        this.getWorkOrdersFromQueue();
    }

    getWorkOrdersFromQueue() {
        axios.get('/api/work_orders')
            .then(res => {
                if (res.data.length > 0) {
                    this.paginationInstance.itemList = res.data;
                    this.paginationInstance.calculateNumOfPages();
                    let pageItems = this.paginationInstance.displayItemsOnPage(this.currentPage);

                    this.setState({
                        workOrders: res.data, currentWorkOrders: pageItems
                    })
                }

            })
            .catch(err => console.log(err))
    }

    updatePageItems() {
        let pageItems = this.paginationInstance.displayItemsOnPage(this.currentPage);
        this.setState({
            currentWorkOrders: pageItems
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

    removeFromQueue(workOrder) {
        axios.post('/api/work_orders/completed', workOrder)
            .then(() => {
                this.getWorkOrdersFromQueue();
            })
            .catch(err => console.log(err))
    }

    renderWorkOrders() {
        let tempArr = [];
        let { currentWorkOrders } = this.state;
        for (let i = 0; i < currentWorkOrders.length; i++) {
            let newDate = moment(currentWorkOrders[i].date_created).format('YYYYMMDD');
            let timeElapsed = moment(newDate, 'YYYYMMDD').fromNow().split(' ');
            if (timeElapsed[0] === 'a') {
                timeElapsed[0] = 1;
            }
            let workOrder =
                <div key={currentWorkOrders[i].job_id} className="job">
                    <div className="job-id">
                        Job Id: {currentWorkOrders[i].job_id}
                    </div>
                    <div className="property-address">
                        {
                            currentWorkOrders[i].property_street + ' ' + currentWorkOrders[i].property_city +
                            ', ' + currentWorkOrders[i].property_state + ' ' + currentWorkOrders[i].property_zipcode
                        }
                    </div>
                    <div className="job-date">
                        <div className="date">
                            {currentWorkOrders[i].date_created}
                        </div>
                        <div className="time">
                            {currentWorkOrders[i].time_created}
                        </div>
                    </div>
                    <div className="job-elapsed-time">
                        {timeElapsed[0] + ' ' + timeElapsed[1]}
                    </div>
                    <div className="job-controls">
                        <div className="action"> <i className="fa fa-eye"></i></div>
                        <div onClick={() => this.removeFromQueue(currentWorkOrders[i])} className="action"> <i className="fa fa-check-circle"></i></div>
                    </div>
                </div>;
            tempArr.push(workOrder)
        }
        return tempArr;
    }
    render() {
        return (
            <div className="job-queue">
                <div className="job-queue-header">
                    <h4>Work Queue <span className="job-number">({this.paginationInstance.itemList.length} Work Orders)</span></h4>
                </div>
                <div className="job-queue-container">
                    {this.renderWorkOrders()}
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

export default WorkOrderQueue;