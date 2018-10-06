import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPropertyAddress } from '../../redux/reducer';
class Step1 extends Component {
    constructor() {
        super();
        this.state = {
            propertyStreet: '',
            propertyCity: '',
            propertyState: '',
            propertyZipcode: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateWizard = this.updateWizard.bind(this);
    }
    componentDidMount() {
        this.props.onStep('step1');
        this.props.updateStep('step1');
        let { propertyStreet, propertyCity, propertyState, propertyZipcode } = this.props;
        this.setState({
            propertyStreet, propertyCity, propertyState, propertyZipcode
        })
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateWizard() {
        let { propertyStreet, propertyCity, propertyState, propertyZipcode } = this.state;
        propertyZipcode = +propertyZipcode;
        this.props.setPropertyAddress(propertyStreet, propertyCity, propertyState, propertyZipcode);
        this.props.updateStep('step2')
    }

    render() {
        return (
            <div className="step1">
                <h4 className="wizard-step-title">Property Address</h4>
                <div className="address-information">
                    <div className="input-group">
                        <h6>Street</h6>
                        <input value={this.state.propertyStreet} onChange={this.handleInputChange} name="propertyStreet" type="text" />
                    </div>
                    <div className="input-group">
                        <h6>City</h6>
                        <input value={this.state.propertyCity} onChange={this.handleInputChange} name="propertyCity" type="text" />
                    </div>
                    <div className="input-group">
                        <h6>State</h6>
                        <input value={this.state.propertyState} onChange={this.handleInputChange} name="propertyState" type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Zipcode</h6>
                        <input value={this.state.propertyZipcode} onChange={this.handleInputChange} name="propertyZipcode" type="text" />
                    </div>

                </div>
                <div className="wizard-controls">
                    <button onClick={this.updateWizard}>Next Step</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { propertyStreet, propertyCity, propertyState, propertyZipcode } = state;
    return {
        propertyStreet, propertyCity, propertyState, propertyZipcode
    }
}

export default connect(mapStateToProps, { setPropertyAddress })(Step1);