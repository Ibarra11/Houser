import React, { Component } from "react";
import axios from "axios";
import StateList from "../../data/states";
import Updating from "../Updating/Updating";
class EditProperty extends Component {
  constructor() {
    super();
    this.state = {
      property_street: "",
      property_city: "",
      property_state: "",
      stateList: StateList,
      property_zipcode: "",
      property_rent: "",
      tenant_name: "",
      tenant_phone: "",
      tenant_ssn: "",
      tenant_email: "",
      isUpdating: false
    };
  }

  componentDidMount() {
    this.setState({
      ...this.props.property
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdating === true && this.state.isUpdating === false) {
      this.closeForm();
    }
  }

  onInputChange = e => {
    if (e.target.name === "tenant_ssn") {
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  closeForm = (e = false, propertyData) => {
    if (e) {
      e.preventDefault();
    }
    this.props.property.removeFocus(this.state);
    this.props.toggleEditProperty();
  };
  handleEditForm = e => {
    e.preventDefault();
    let {
      property_street,
      property_state,
      property_city,
      property_zipcode,
      property_rent,
      tenant_name,
      tenant_phone,
      tenant_ssn,
      tenant_email
    } = this.state;
    this.setState(
      {
        isUpdating: true
      },
      () => {
        axios
          .put(`/api/property/${this.props.property.property_id}`, {
            property_street,
            property_state,
            property_city,
            property_zipcode,
            property_rent,
            tenant_name,
            tenant_phone,
            tenant_ssn,
            tenant_email
          })
          .then(async resData => {
            //  this.closeForm(false, resData.data[0]);
            this.setState({
              isUpdating: false,
              ...resData.data[0]
            });
          });
      }
    );
  };
  render() {
    return (
      <div
        className={
          this.state.isUpdating
            ? "component-edit-property updating-property"
            : "component-edit-property"
        }
      >
        <Updating
          isUpdating={this.state.isUpdating}
          title={"Updating Property"}
        >
          <div className="property-img">
            <img src={this.props.property.property_img} alt="The property" />
          </div>
          <form onSubmit={this.handleEditForm} className="edit-property-form">
            <div className="form-group">
              <div className="group-header">
                <h5>Address</h5>
              </div>
              <div className="input-group">
                <label htmlFor="street">Street</label>
                <input
                  name="property_street"
                  onChange={this.onInputChange}
                  type="text"
                  value={this.state.property_street}
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="property_city"
                  onChange={this.onInputChange}
                  value={this.state.property_city}
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <select name="state" onChange={this.onInputChange}>
                  <option value={this.state.property_state}>
                    {this.state.property_state}
                  </option>
                  {this.state.stateList.map(state => {
                    if (this.state.property_state !== state) {
                      return (
                        <option
                          key={state.abbreviation}
                          value={state.abbreviation}
                        >
                          {state.abbreviation}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  name="property_zipcode"
                  onChange={this.onInputChange}
                  value={this.state.property_zipcode}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="group-header">
                <h5>Finances</h5>
              </div>
              <div className="input-group">
                <label htmlFor="rent">Rent</label>
                <input
                  name="property_rent"
                  type="text"
                  onChange={this.onInputChange}
                  value={this.state.property_rent}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="group-header">
                <h5>Tenant Information</h5>
              </div>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="tenant_name"
                  onChange={this.onInputChange}
                  value={this.state.tenant_name}
                />
              </div>
              <div className="input-group">
                <label htmlFor="name">Last 4 of SSN</label>
                <input
                  type="text"
                  name="tenant_ssn"
                  onChange={this.onInputChange}
                  value={this.state.tenant_ssn}
                />
              </div>
              <div className="input-group">
                <label htmlFor="street">Phone</label>
                <input
                  type="text"
                  name="tenant_phone"
                  onChange={this.onInputChange}
                  value={this.state.tenant_phone}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="tenant_email"
                  onChange={this.onInputChange}
                  value={this.state.tenant_email}
                />
              </div>
            </div>
            <div className="form-submit">
              <button
                onClick={this.handleEditForm}
                className="btn"
                type="submit"
              >
                Edit
              </button>
              <button className="btn" onClick={this.closeForm}>
                Close
              </button>
            </div>
          </form>
        </Updating>
      </div>
    );
  }
}

export default EditProperty;
