import React, { Component } from "react";
import Numeral from "numeral";
class Property extends Component {
  constructor() {
    super();
    this.state = {
      property_edited: false,
      property_city: "",
      property_street: "",
      property_state: "",
      property_zipcode: 0,
      tenant_email: "",
      tenant_name: "",
      tenant_phone: "",
      tenant_ssn: "",
      property_rent: "",
      property_id: "",
      property_img: ""
    };
  }

  componentDidMount() {
    let {
      property_city,
      property_id,
      property_img,
      property_street,
      property_state,
      property_zipcode,
      tenant_email,
      tenant_name,
      tenant_phone,
      tenant_ssn,
      property_rent
    } = this.props.property;
    this.setState({
      property_city,
      property_street,
      property_state,
      property_zipcode,
      tenant_email,
      tenant_name,
      tenant_phone,
      tenant_ssn,
      property_rent,
      property_id,
      property_img
    });
  }

  handlePropertyUpdate = propertyData => {
    this.setState({
      property_edited: false,
      ...propertyData
    });
  };

  handleEditProperty = () => {
    this.setState(
      {
        property_edited: true
      },
      this.props.editProperty(this.state, this.handlePropertyUpdate)
    );
  };

  render() {
    return (
      <div
        className={
          this.state.property_edited
            ? "property property-edit-mode"
            : "property"
        }
      >
        <div className="property-img">
          <img src={this.state.property_img} alt="property-img" />
        </div>
        <div className="property-details">
          <div className="property-address">
            <h5>Address</h5>
            <p>Street: {this.state.property_street}</p>
            <p>City: {this.state.property_city}</p>
            <p>State: {this.state.property_state}</p>
            <p>Zipcode: {this.state.property_zipcode}</p>
          </div>
          <div className="property-rent">
            <h5>Finances</h5>
            <p>Rent: ${Numeral(this.state.property_rent).format("0,0.00")}</p>
          </div>
          <div className="property-tenants">
            <h5>Tenant Information</h5>
            <p> Name: {this.state.tenant_name}</p>
            <p> Phone: {this.state.tenant_phone}</p>
            <p> Email: {this.state.tenant_email}</p>
            <p> Last 4 of SSN: {this.state.tenant_ssn}</p>
          </div>
          <div className="property-actions">
            <div onClick={this.handleEditProperty} className="action">
              <i className="fa fa-edit" />
            </div>
            <div
              onClick={() => this.props.deleteProperty(this.state.property_id)}
              className="action"
            >
              <i className="fa fa-trash" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Property;
