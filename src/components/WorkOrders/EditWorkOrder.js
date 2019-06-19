import React, { Component } from "react";
import axios from "axios";
import StateList from "../../utilities/StateList";
import { formatPhoneNumber } from "../../utilities/Format";
class EditWorkOrder extends Component {
  constructor() {
    super();
    this.state = {
      jobId: 0,
      companyName: "",
      companyPhone: "",
      companyAddress: "",
      companyCity: "",
      companyState: "",
      companyZipcode: "",
      workDescription: "",
      stateList: []
    };
  }

  componentDidMount() {
    let {
      job_id,
      company_name,
      company_phone,
      company_address,
      company_city,
      company_state,
      company_zipcode,
      work_description
    } = this.props.workOrderData;
    this.setState({
      jobId: job_id,
      companyName: company_name,
      companyPhone: company_phone,
      companyAddress: company_address,
      companyCity: company_city,
      companyState: company_state,
      companyZipcode: company_zipcode,
      workDescription: work_description,
      stateList: StateList(company_state)
    });
  }

  editWorkOrder = () => {
    axios.put(`/api/workorder/${this.state.jobId}`, this.state).then(res => {
      this.props.cancelEditWorkOrder(res.data);
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="edit-work-order">
        <div className="property-info-container">
          <div className="property-img">
            <img
              src={this.props.workOrderData.property_img}
              alt="property img"
            />
          </div>
        </div>
        <div className="work-order-info-container">
          <div className="form">
            <div className="input-group">
              <label>Company Name: </label>
              <input
                name="companyName"
                onChange={this.handleChange}
                value={this.state.companyName}
                type="text"
              />
            </div>
            <div className="input-group">
              <label>Company Phone: </label>
              <input
                name="companyPhone"
                onChange={this.handleChange}
                value={this.state.companyPhone}
                type="text"
              />
            </div>
            <div className="input-group">
              <label>Company Address: </label>
              <input
                name="companyAddress"
                onChange={this.handleChange}
                value={this.state.companyAddress}
                type="text"
              />
            </div>
            <div className="input-group">
              <label>Company City: </label>
              <input
                name="companyCity"
                onChange={this.handleChange}
                value={this.state.companyCity}
                type="text"
              />
            </div>
            <div className="input-group">
              <label>Company State: </label>
              <select name="companyState" onChange={this.handleChange}>
                <option value={this.state.companyState}>
                  {this.state.companyState}
                </option>
                {this.state.stateList}
              </select>
            </div>
            <div className="input-group">
              <label>Company Zipcode: </label>
              <input
                name="companyZipcode"
                onChange={this.handleChange}
                value={this.state.companyZipcode}
                type="text"
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Job Description: </label>
              <textarea
                name="workDescription"
                onChange={this.handleChange}
                value={this.state.workDescription}
              />
            </div>
          </div>
        </div>
        <div className="edit-buttons">
          <button onClick={this.editWorkOrder}>Edit</button>
          <button onClick={this.props.cancelEditWorkOrder}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default EditWorkOrder;
