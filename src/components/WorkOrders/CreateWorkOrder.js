import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { AsYouType } from "libphonenumber-js";
import propertyPlaceholder from "../../assets/images/propertyPlaceholder.jpg";
import StateList from "../../utilities/StateList";
class CreateWorkOrder extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      stateList: [],
      propertyIndex: -1,
      companyName: "",
      companyPhone: "",
      companyAddress: "",
      companyCity: "",
      companyZipcode: "",
      companyState: "",
      workDescription: ""
    };
    this.listProperties = this.listProperties.bind(this);
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitWorkOrder = this.submitWorkOrder.bind(this);
    this.clearWorkOrder = this.clearWorkOrder.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/property")
      .then(res => {
        this.setState({ properties: res.data }, () => {
          let stateList = StateList();
          this.setState({ stateList, companyState: stateList[0].props.value });
        });
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

  clearWorkOrder() {
    this.setState(
      {
        propertyIndex: -1,
        companyName: "",
        companyAddress: "",
        companyPhone: "",
        companyCity: "",
        companyState: "",
        companyZipcode: "",
        workDescription: ""
      },
      () => (document.getElementById("propertySelect").value = "defaultValue")
    );
  }

  submitWorkOrder() {
    let {
      propertyIndex,
      companyName,
      companyAddress,
      companyCity,
      companyState,
      companyZipcode,
      companyPhone,
      workDescription
    } = this.state;

    let date = moment().format("l");
    let time = moment().format("LT");
    let propertyId = this.state.properties[propertyIndex].property_id;

    axios
      .post("/api/work_orders", {
        propertyId,
        companyName,
        companyAddress,
        companyCity,
        companyState,
        companyZipcode,
        companyPhone,
        workDescription,
        date,
        time,
        workOrderStatus: "queue"
      })
      .then(() => {
        this.props.renderView();
      })
      .catch(err => console.log(err));
  }

  render() {
    let property = this.state.properties[this.state.propertyIndex];
    return (
      <div className="create-work-order">
        <div className="header">
          <h4>Create Work Order</h4>
        </div>
        <div className="section-container">
          <div className="property-section">
            <div className="property-img">
              {
                <img
                  src={property ? property.property_img : propertyPlaceholder}
                  alt="property img"
                />
              }
            </div>
            <div className="work-order-request">
              <h5 className="section-title">Work Order Request</h5>
              <div className="property-buttons">
                <button onClick={this.submitWorkOrder} className="btn">
                  Submit
                </button>
                <button onClick={this.clearWorkOrder} className="btn">
                  Clear
                </button>
              </div>
            </div>
            <div className="property-selector">
              <div className="select-container">
                <h6>Select A Property</h6>
                <select id="propertySelect" onChange={this.onPropertyChange}>
                  {this.state.propertyIndex === -1 ? (
                    <option value="defaultValue" />
                  ) : null}
                  {this.listProperties()}
                </select>
              </div>
            </div>
          </div>
          <div className="company-section">
            <div className="company-info">
              <h5 className="section-title">Company Information</h5>
              <div className="input-container">
                <div className="input-group">
                  <h6>Name:</h6>
                  <input
                    name="companyName"
                    onChange={this.onInputChange}
                    type="text"
                    value={this.state.companyName}
                  />
                </div>

                <div className="input-group">
                  <h6>Address:</h6>
                  <input
                    name="companyAddress"
                    onChange={this.onInputChange}
                    type="text"
                    value={this.state.companyAddress}
                  />
                </div>

                <div className="input-group">
                  <h6>City:</h6>
                  <input
                    name="companyCity"
                    onChange={this.onInputChange}
                    type="text"
                    value={this.state.companyCity}
                  />
                </div>

                <div className="input-group">
                  <h6>State:</h6>
                  <select
                    name="companyState"
                    className="selectState"
                    onChange={this.onInputChange}
                    value={this.state.companyState}
                  >
                    {this.state.stateList}
                  </select>
                </div>

                <div className="input-group">
                  <h6>Zipcode:</h6>
                  <input
                    name="companyZipcode"
                    onChange={this.onInputChange}
                    type="text"
                    value={this.state.companyZipcode}
                  />
                </div>

                <div className="input-group">
                  <h6>Phone:</h6>
                  <input
                    name="companyPhone"
                    onChange={this.onInputChange}
                    type="text"
                    value={this.state.companyPhone}
                  />
                </div>
              </div>
            </div>

            <div className="work-description">
              <h5 className="section-title">Work Description</h5>
              <div className="description-box">
                <textarea
                  onChange={this.onInputChange}
                  name="workDescription"
                  className="text-box"
                  value={this.state.workDescription}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateWorkOrder;
