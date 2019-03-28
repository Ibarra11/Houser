import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { AsYouType } from "libphonenumber-js";
class CreateWorkOrder extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      propertyIndex: -1,
      companyName: "",
      companyPhone: "",
      companyEmail: "",
      companyCharge: "",
      description: ""
    };
    this.listProperties = this.listProperties.bind(this);
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.workOrder = this.workOrder.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/property")
      .then(res => {
        this.setState({ properties: res.data });
      })
      .catch(err => console.log(err));
  }

  listProperties() {
    let tempArr = [];
    for (
      let propertyIndex = 0;
      propertyIndex < this.state.properties.length;
      propertyIndex++
    ) {
      let {
        property_id,
        property_city,
        property_state,
        property_street,
        property_zipcode
      } = this.state.properties[propertyIndex];
      let option = (
        <option key={property_id} value={propertyIndex}>
          {property_street}, {property_city}, {property_state}{" "}
          {property_zipcode}
        </option>
      );
      tempArr.push(option);
    }
    return tempArr;
  }

  onPropertyChange(e) {
    console.log(this.state.properties[e.target.value]);
    this.setState({
      propertyIndex: +e.target.value
    });
  }

  onInputChange(e) {
    if (e.target.name === "companyPhone") {
      // Only allows phone numbers (209) 111-1111
      if (this.state.companyPhone.length <= 13) {
        this.setState({
          companyPhone: new AsYouType("US").input(e.target.value)
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  workOrder() {
    let date = moment().format("l");
    let time = moment().format("LT");
    let {
      propertyIndex,
      companyName,
      companyCharge,
      companyEmail,
      companyPhone,
      description
    } = this.state;
    companyCharge = parseFloat(companyCharge);

    axios
      .post("/api/work_orders", {
        propertyIndex,
        companyName,
        companyCharge,
        companyEmail,
        companyPhone,
        description,
        date,
        time
      })
      .then(() => {
        this.props.renderView("WorkOrderQueue");
      })
      .catch(err => console.log(err));
  }

  render() {
    let property = this.state.properties[this.state.propertyIndex];
    return (
      // <div className="add-job">
      //     <div className="job-order-form">
      //         <div className="form-header">
      //             <h4>Create Work Order</h4>
      //         </div>
      //         <div className="form-body">
      //             <div className="form-left-side">
      //                 <div className="property-information">
      //                     <h5>Property Information</h5>
      //                     <div className="input-group">
      //                         <h6>Select A Property</h6>
      //                         <select onChange={this.onPropertyChange}>
      //                             <option value=""></option>
      //                             {this.listProperties()}
      //                         </select>
      //                     </div>
      //                 </div>
      //                 <div className="company-information">
      //                     <h5>Company/Worker Information</h5>
      //                     <div className="input-group">
      //                         <h6>Name</h6>
      //                         <input name="companyName" onChange={this.onInputChange} value={this.state.companyName} type="text" />
      //                     </div>
      //                     <div className="input-group">
      //                         <h6>Phone Number</h6>
      //                         <input name="companyPhone" onChange={this.onInputChange} value={this.state.companyPhone} type="text" />
      //                     </div>
      //                     <div className="input-group">
      //                         <h6>Email</h6>
      //                         <input name="companyEmail" onChange={this.onInputChange} value={this.state.companyEmail} type="text" />
      //                     </div>
      //                     <div className="input-group">
      //                         <h6>Charge</h6>
      //                         <input name="companyCharge" onChange={this.onInputChange} value={this.state.companyCharge} type="text" />
      //                     </div>
      //                 </div>
      //             </div>
      //             <div className="form-right-side">
      //                 <div className="job-description">
      //                     <h5>Job Description</h5>
      //                     <textarea onChange={this.onInputChange} name="description"></textarea>
      //                 </div>
      //             </div>
      //         </div>
      //         <div className="form-footer">
      //             <button onClick={this.workOrder}>Create</button>
      //             <button>Clear</button>
      //         </div>
      //     </div>
      // </div>
      <div className="create-work-order">
        <div className="header">
          <h4>Create Work Order</h4>
        </div>
        <div className="section-container">
          <div className="property-section">
            <div className="property-img">
              {property ? (
                <img src={property.property_img} alt="property img" />
              ) : null}
            </div>
            <div className="property-information">
              <p>hello</p>
            </div>
            <div className="property-selector">
              <h6>Select A Property</h6>
              <select onChange={this.onPropertyChange}>
                <option value="" />
                {this.listProperties()}
              </select>
            </div>
          </div>
          <div className="company-section">
            <div className="company-info">
              <h5>Company/Worker Information</h5>
              <div className="input-group">
                <h6>Name:</h6>
                <input type="text" />
              </div>
              <div className="property-desc">
                <div className="input-group">
                  <h6>Address:</h6>
                  <input type="text" />
                </div>
              </div>
              <div className="property-desc">
                <div className="input-group">
                  <h6>City:</h6>
                  <input type="text" />
                </div>
              </div>
              <div className="property-desc">
                <div className="input-group">
                  <h6>State:</h6>
                  <input type="text" />
                </div>
              </div>
              <div className="property-desc">
                <div className="input-group">
                  <h6>Zipcode:</h6>
                  <input type="text" />
                </div>
              </div>
              <div className="property-desc">
                <div className="input-group">
                  <h6>Phone:</h6>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="work-description">
              <h5>Work Description</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateWorkOrder;
