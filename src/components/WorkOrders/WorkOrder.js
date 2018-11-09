import React, { Component } from 'react';
class WorkOrder extends Component {
    constructor() {
        super();
        this.state = {
            displayWorkOrderInfo: false
        }
    }

    renderWorkOrderInfo = () => {
        this.setState({ displayWorkOrderInfo: !this.state.displayWorkOrderInfo });
    }

    renderComponent = () => {
        let { job_id, date_created, property_img, property_city, property_street, property_state,
            property_zipcode, company_name, company_phone, company_email, company_charge, job_description }
            = this.props.data;
        if (this.state.displayWorkOrderInfo) {
            return (
                <div className="work-order-info">
                    <img src={property_img} alt="property img" />
                    <div onClick={this.renderWorkOrderInfo} className="cancel-icon"><i className="fa fa-times"></i></div>
                    <div className="work-order-content">
                        <div className="company-info">
                            <h5>Company Info</h5>
                            <p>Name: {company_name}</p>
                            <p>Phone: {company_phone}</p>
                            <p>Email: {company_email}</p>
                            <p>Charge: ${company_charge}</p>
                        </div>
                        <div className="job-description">
                            <h5>Job Description</h5>
                            <p>{job_description}</p>
                        </div>
                    </div>

                </div>
            );
        }
        else {

            return (
                <div className="card-img-header">
                    <img src={property_img} alt="property img" />
                    <div className="card-overlay">
                        <div className="job-id">
                            <h5> Work Order #{job_id}</h5>
                        </div>
                        <div className="property-address">
                            <p>{property_street}, {property_city}, {property_state} {property_zipcode}</p>
                            <p>{date_created}</p>
                        </div>
                        <div className="card-controls">
                            <i onClick={this.renderWorkOrderInfo} className="fa fa-eye"></i>
                            <i onClick={() => this.props.editWorkOrder(this.props.data, this.props.index)} className="fa fa-edit"></i>
                            <i onClick={() => this.props.deleteWorkOrder(job_id)} className="fa fa-trash"></i>
                        </div>
                    </div>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="work-order">
                {this.renderComponent()}
            </div>
        )
    }
}

export default WorkOrder;