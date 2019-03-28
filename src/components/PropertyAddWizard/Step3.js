import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTenantInformation } from '../../redux/reducer';
import {formatPhoneNumber} from '../../utilities/Format';
class Step3 extends Component {
    constructor() {
        super();
        this.state = {
            propertyTenantName: '',
            propertyTenantContactNumber: '',
            propertyTenantEmail: '',
            propertyTenantSSN: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.onStep('step3');
        let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN } = this.props;
        this.setState({
            propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN
        })
    }

  

    handleInputChange(e) {
        
        if (e.target.name === 'propertyTenantContactNumber') {
            if(e.target.value.length < 14  ){
                let phoneNumber = formatPhoneNumber(e.target.value);
               phoneNumber || phoneNumber === '' ? this.setState({propertyTenantContactNumber: phoneNumber}) : null;
            }
        }
        else if (e.target.name === 'propertyTenantSSN') {
            let val = Number(e.target.value);
            if (e.target.value.length <= 4 && val) {
                this.setState({ propertyTenantSSN: val });
            }
            else if (e.target.value === ' ') {
                this.setState({ propertyTenantSSN: e.target.value });
            }
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    updateWizard(direction) {
        let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN } = this.state;
        this.props.setTenantInformation(propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN);

        direction === 'next' ? this.props.updateStep('step4') : this.props.updateStep('step2')
    }


    render() {
        return (
            <div className="step3">
                <h4 className="wizard-step-title">Tenant Information</h4>
                <p>Fill out information if the propery is currently rented otherwise leave blank.</p>
                <div className="tenant-information">
                    <div className="input-group">
                        <h6>Name</h6>
                        <input value={this.state.propertyTenantName} name="propertyTenantName" onChange={this.handleInputChange} type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Contact Number</h6>
                        <input value={this.state.propertyTenantContactNumber} name="propertyTenantContactNumber" onChange={this.handleInputChange} type="tel" />
                    </div>
                    <div className="input-group">
                        <h6>Email Address </h6>
                        <input value={this.state.propertyTenantEmail} name="propertyTenantEmail" onChange={this.handleInputChange} type="email" />
                    </div>
                    <div className="input-group">
                        <h6>Last 4 Digits of SSN</h6>
                        <input type="password" value={this.state.propertyTenantSSN} name="propertyTenantSSN" onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="wizard-controls">
                    <button onClick={() => this.updateWizard('prev')}>Previous Step</button>
                    <button onClick={() => this.updateWizard('next')}>Next Step</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN } = state;
    return {
        propertyTenantName, propertyTenantContactNumber, propertyTenantEmail, propertyTenantSSN
    }
}
export default connect(mapStateToProps, { setTenantInformation })(Step3);