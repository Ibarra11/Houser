import React, { Component } from 'react';
import { connect } from 'react-redux';
class Step5 extends Component {
    componentDidMount() {
        this.props.onStep('step5');
    }
    render() {
        return (
            <div className="step5">
                <div className="wizard-header">
                    <h4 className="wizard-step-title">Property Confirmation</h4>
                </div>
                <div className="property-information">
                    <div className="property-img">
                        <img src={this.props.propertyImg} alt="property image" />
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
                            <p>Loan Amount: {this.props.propertyLoanAmount}</p>
                            <p>Mortgage: {this.props.propertyMortgage}</p>
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
                    <button onClick={() => this.props.updateStep('step4')}>Previous Step</button>
                    <button onClick={() => this.props.updateStep('step1')}>Add Property</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {
        propertyStreet, propertyCity, propertyState, propertyZipcode,
        propertyLoanAmount, propertyMortgage, propertyRent,
        propertyTenantName, propertyTenantContactNumber,
        propertyTenantEmail, propertyImg } = state;
    return {
        propertyStreet, propertyCity, propertyState, propertyZipcode,
        propertyLoanAmount, propertyMortgage, propertyRent,
        propertyTenantName, propertyTenantContactNumber, propertyTenantEmail,
        propertyImg
    }
}

export default connect(mapStateToProps, null)(Step5);