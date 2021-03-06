import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { clearState } from "../../redux/reducer";
import PropertyImgPlaceholder from "../../assets/images/propertyPlaceholder.jpg";
import { BarLoader } from "react-spinners";
class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processingProperty: false
    };
  }
  componentDidMount() {
    this.props.onStep("step5");
  }

  uploadPhotoToCloud = async () => {
    let {
      REACT_APP_UPLOAD_PRESET,
      CLOUDINARY_API_KEY,
      REACT_APP_CLOUD_NAME
    } = process.env;
    // Information must be in form data, that's the way Cloudinary wants it
    const formData = new FormData();
    formData.append(
      "file",
      this.props.propertyImgFile || PropertyImgPlaceholder
    );
    formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
    formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
    formData.append("timestamp", (Date.now() / 1000) | 0);
    // Make an AJAX upload request using Axios, pass in formData
    let fileURL;
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }
      )
      .then(response => {
        const data = response.data;
        fileURL = data.secure_url; // You should store this URL for future references in your app;
      })
      .catch(err => console.log(err));

    return fileURL;
  };

  addProperty = () => {
    /* 
            First I am going to set the state for processingProperty, so I can inform the user that the property is being
            added.  Meanwhile the properyt is being sent to the server;
        */
    this.setState({ processingProperty: true }, async () => {
      let imgUrl = await this.uploadPhotoToCloud();
      await axios
        .post("/api/property", { ...this.props, imgUrl })
        .then(() => {
          this.props.updatePropertyList();
          this.props.clearState();
          this.props.updateStep("step1");
        })
        .catch(err => console.log(err));
      this.setState({
        processingProperty: false
      });
    });
  };

  render() {
    return (
      <div className="step5">
        <div className="wizard-header">
          <h4 className="wizard-step-title">Property Confirmation</h4>
        </div>
        <div
          className={
            this.state.processingProperty ? "processing-property" : "hidden"
          }
        >
          <div className="processing-property-text">
            <h3>Adding Property</h3>
          </div>
          <div className="processing-property-loader">
            <BarLoader
              size={50}
              color={"#fff"}
              loading={this.state.processingProperty}
            />
          </div>
        </div>
        <div className="property-information">
          <div className="property-img">
            <img
              src={
                this.props.propertyImgFile.preview
                  ? this.props.propertyImgFile.preview
                  : PropertyImgPlaceholder
              }
              alt="property image"
            />
          </div>
          <div className="property-section">
            <h6>Property Address</h6>
            <div className="property-content">
              <p>Street: {this.props.propertyStreet}</p>
              <p>City: {this.props.propertyCity}</p>
              <p>State: {this.props.propertyState}</p>
              <p>Zipcode: {this.props.propertyZipcode}</p>
            </div>
          </div>
          <div className="property-section">
            <h6>Financial Information</h6>
            <div className="property-content">
              <p>Rent: {this.props.propertyRent}</p>
            </div>
          </div>
          <div className="property-section">
            <h6>Tenant Information</h6>
            <div className="property-content">
              <p>Name: {this.props.propertyTenantName}</p>
              <p>Contact Number: {this.props.propertyTenantContactNumber}</p>
              <p>Email Address: {this.props.propertyTenantEmail}</p>
            </div>
          </div>
        </div>
        <div className="wizard-controls">
          <button onClick={() => this.props.updateStep("step4")}>
            Previous Step
          </button>
          <button onClick={() => this.addProperty()}>Add Property</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let {
    propertyStreet,
    propertyCity,
    propertyState,
    propertyZipcode,
    propertyLoanAmount,
    propertyMortgage,
    propertyRent,
    propertyTenantName,
    propertyTenantContactNumber,
    propertyTenantEmail,
    propertyTenantSSN,
    propertyImgFile
  } = state;
  return {
    propertyStreet,
    propertyCity,
    propertyState,
    propertyZipcode,
    propertyLoanAmount,
    propertyMortgage,
    propertyRent,
    propertyTenantName,
    propertyTenantContactNumber,
    propertyTenantEmail,
    propertyTenantSSN,
    propertyImgFile
  };
}

export default connect(
  mapStateToProps,
  { clearState }
)(Step5);
