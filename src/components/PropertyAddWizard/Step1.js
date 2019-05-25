import React, { Component } from "react";
import { connect } from "react-redux";
import { setPropertyAddress } from "../../redux/reducer";
import axios from "axios";

class Step1 extends Component {
  constructor() {
    super();
    this.state = {
      propertyStreet: "",
      propertyCity: "",
      propertyState: "",
      propertyZipcode: "",
      states: [],
      addressAutoComplete: [],
      addressSelected: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.updateWizard = this.updateWizard.bind(this);
  }

  componentDidMount() {
    this.props.onStep("step1");
    this.props.updateStep("step1");
    let {
      propertyStreet,
      propertyCity,
      propertyState,
      propertyZipcode
    } = this.props;
    axios
      .get(
        "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json"
      )
      .then(res => {
        this.setState({
          propertyStreet,
          propertyCity,
          propertyState: propertyState
            ? propertyState
            : res.data[0].abbreviation,
          propertyZipcode,
          states: res.data
        });
      });
  }

  handleInputChange(e) {
    let { REACT_APP_ADDRESS_AUTH_ID, REACT_APP_ADDRESS_API } = process.env;
    let address = e.target.value;
    if (e.target.name === "propertyStreet") {
      axios
        .get(
          `${REACT_APP_ADDRESS_API}auth-id=${REACT_APP_ADDRESS_AUTH_ID}&prefix=${
            e.target.value
          }`
        )
        .then(addresses => {
          this.setState({
            addressAutoComplete: addresses.data.suggestions || [],
            propertyStreet: address
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSelectChange(e) {
    let address = e.target.value.split(",");
    this.setState({
      propertyStreet: address[0],
      propertyCity: address[1],
      propertyState: address[2],
      addressAutoComplete: []
    });
  }

  updateWizard() {
    // All fields of this step must be completed before going on
    let {
      propertyStreet,
      propertyCity,
      propertyState,
      propertyZipcode
    } = this.state;
    if (propertyStreet && propertyCity && propertyState && propertyZipcode) {
      let {
        propertyStreet,
        propertyCity,
        propertyState,
        propertyZipcode
      } = this.state;
      propertyZipcode = +propertyZipcode;
      this.props.setPropertyAddress(
        propertyStreet,
        propertyCity,
        propertyState,
        propertyZipcode
      );
      this.props.updateStep("step2");
    } else {
      this.props.toggleAlert();
    }
  }

  render() {
    return (
      <div className="step1">
        <h4 className="wizard-step-title">Property Address</h4>
        <div className="address-information">
          <div className="input-group">
            <h6>Street</h6>
            <input
              value={this.state.propertyStreet}
              onChange={this.handleInputChange}
              name="propertyStreet"
              type="text"
            />
            {this.state.addressAutoComplete.length > 0 ? (
              <select
                name="addressSelected"
                size={this.state.addressAutoComplete.length}
                onChange={this.handleSelectChange}
              >
                {this.state.addressAutoComplete.map(address => {
                  let { street_line, city, state } = address;
                  return (
                    <option
                      key={address.text}
                      value={[street_line, city, state]}
                    >
                      {address.text}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>
          <div className="input-group">
            <h6>City</h6>
            <input
              value={this.state.propertyCity}
              onChange={this.handleInputChange}
              name="propertyCity"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="input-group">
            <h6>State</h6>
            <select
              value={this.state.propertyState}
              name="propertyState"
              onChange={this.handleInputChange}
            >
              {this.state.states.map(state => {
                return (
                  <option value={state.abbreviation} key={state.abbreviation}>
                    {state.abbreviation}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-group">
            <h6>Zipcode</h6>
            <input
              value={this.state.propertyZipcode}
              onChange={this.handleInputChange}
              name="propertyZipcode"
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="wizard-controls">
          <button onClick={this.updateWizard}>Next Step</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { propertyStreet, propertyCity, propertyState, propertyZipcode } = state;
  return {
    propertyStreet,
    propertyCity,
    propertyState,
    propertyZipcode
  };
}

export default connect(
  mapStateToProps,
  { setPropertyAddress }
)(Step1);
