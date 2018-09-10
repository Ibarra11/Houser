import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTenantInformation } from '../../redux/reducer';
class Step3 extends Component {
    constructor() {
        super();
        this.state = {
            propertyTenantName: '',
            propertyTenantContactNumber: '',
            propertyTenantEmail: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.onStep('step3');
        let {propertyTenantName, propertyTenantContactNumber, propertyTenantEmail} = this.props;
        this.setState({
            propertyTenantName, propertyTenantContactNumber, propertyTenantEmail
        })
    }
    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    updateWizard(direction) {
        let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail } = this.state;
        this.props.setTenantInformation(propertyTenantName, propertyTenantContactNumber, propertyTenantEmail);

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
    let { propertyTenantName, propertyTenantContactNumber, propertyTenantEmail } = state;
    return {
        propertyTenantName, propertyTenantContactNumber, propertyTenantEmail
    }
}
export default connect(mapStateToProps, { setTenantInformation })(Step3);