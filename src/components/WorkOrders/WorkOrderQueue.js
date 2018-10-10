import React, { Component } from 'react';
import axios from 'axios';

class WorkOrderQueue extends Component {
    constructor() {
        super();
        this.state = {
            workOrders: []
        }
        this.renderWorkOrders = this.renderWorkOrders.bind(this);
    }
    componentDidMount() {
        axios.get('/api/work_orders')
            .then(res => {
                console.log(res.data);
                this.setState({
                    workOrders: res.data
                })
            })
            .catch(err => console.log(err))
    }

    renderWorkOrders() {
        let tempArr = [];
        let {workOrders} = this.state;
        for (let i = 0; i < workOrders.length; i++) {
            let workOrder =
                <div key={workOrders[i].job_id} className="job">
                    <div className="job-id">
                       Job Id: {workOrders[i].job_id}
                    </div>
                    <div className="property-address">
                            {
                                workOrders[i].property_street + ' ' +  workOrders[i].property_city +
                                ', ' + workOrders[i].property_state + ' ' + workOrders[i].property_zipcode
                            }
                    </div>
                    <div className="job-date">
                        <div className="date">
                            {workOrders[i].date_created}
                    </div>
                        <div className="time">
                            {workOrders[i].time_created}
                    </div>
                    </div>
                    <div className="job-elapsed-time">
                        12 Minutes
                    </div>
                    <div className="job-controls">
                        <i className="fa fa-ellipsis-v"></i>
                    </div>
                </div>;
            tempArr.push(workOrder)
        }
        console.log(tempArr)
        return tempArr;
    }
    render() {
        return (
            <div className="job-queue">
                <div className="job-queue-header">
                    <h4>Job Queue <span className="job-number">(12 Jobs)</span></h4>
                </div>
                <div className="job-queue-container">
                    {this.renderWorkOrders()}
                </div>
                <div className="queue-pagination">
                    <button>Next</button>
                </div>
            </div>
        )
    }
}

export default WorkOrderQueue;