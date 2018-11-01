import React, { Component } from 'react';
import axios from 'axios';
class EditWorkOrder extends Component {
    constructor() {
        super();
        this.state = {
            jobId: 0,
            companyName: '',
            companyEmail: '',
            companyPhone: '',
            companyCharge: '',
            jobDescription: ''
        }
    }

    componentDidMount() {
        let { company_name, job_id, company_charge, company_email, company_phone, job_description } = this.props.workOrderData;
        this.setState({
            jobId: job_id,
            companyName: company_name,
            companyEmail: company_email,
            companyPhone: company_phone,
            companyCharge: company_charge,
            jobDescription: job_description
        })
    }

    editWorkOrder = () => {
        axios.put(`/api/workorder/${this.state.jobId}`, this.state)
        .then(res =>{
            this.props.cancelEditWorkOrder(res.data);
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }



    render() {
        return (
            <div className="edit-work-order">
                <div className="property-info-container">
                    <div className="property-address">
                        <h4>{`${this.props.workOrderData.property_street}, ${this.props.workOrderData.property_city} ${this.props.workOrderData.property_state}, ${this.props.workOrderData.property_zipcode} `}</h4>
                    </div>
                    <div className="property-img">
                        <img src={this.props.workOrderData.property_img} alt="property img" />
                    </div>
                    <div className="edit-buttons">
                        <button onClick={this.editWorkOrder}>Edit</button>
                        <button onClick={this.props.cancelEditWorkOrder}>Cancel</button>
                    </div>
                </div>
                <div className="work-order-info-container">
                    <div className="form">
                        <div className="input-group">
                            <label>Company Name: </label>
                            <input name='companyName' onChange={this.handleChange} value={this.state.companyName} type="text" />
                        </div>
                        <div className="input-group">
                            <label>Company Email: </label>
                            <input name='companyEmail' onChange={this.handleChange} value={this.state.companyEmail} type="text" />
                        </div>
                        <div className="input-group">
                            <label>Company Phone: </label>
                            <input name='companyPhone' onChange={this.handleChange} value={this.state.companyPhone} type="text" />
                        </div>
                        <div className="input-group">
                            <label>Company charge: </label>
                            <input name='companyCharge' onChange={this.handleChange} value={this.state.companyCharge} type="text" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Job Description: </label>
                            <textarea name='jobDescription' onChange={this.handleChange} value={this.state.jobDescription}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditWorkOrder;