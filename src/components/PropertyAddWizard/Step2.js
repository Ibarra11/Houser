import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFinancialInformation } from '../../redux/reducer';
class Step2 extends Component {

    constructor() {
        super();
        this.state = {
            propertyRent: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateWizard = this.updateWizard.bind(this);
    }
    componentDidMount() {
        this.props.onStep('step2');
        let { propertyRent } = this.props;
        this.setState({ propertyRent });
    }
    handleInputChange(e) {
        let rentValue = Number(e.target.value);
        if(rentValue || e.target.value === ""){
            this.setState({ [e.target.name]: e.target.value });
        }
    }
    updateWizard(direction) {
        let { propertyRent } = this.state;
        if (propertyRent) {
            this.props.setFinancialInformation(propertyRent);
            direction === 'next' ? this.props.updateStep('step3') : this.props.updateStep('step1');
        }
        else {
            this.props.toggleAlert();
        }
    }
    render() {
        return (
            <div className="step2">
                <h4 className="wizard-step-title">Financial Information</h4>
                <div className="financial-information">
                    <div className="input-group">
                        <h6>Rent</h6>
                        <input value={this.state.propertyRent} name="propertyRent" onChange={this.handleInputChange} type="text" />
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

    let { propertyRent } = state;
    return {
        propertyRent
    }
}
export default connect(mapStateToProps, { setFinancialInformation })(Step2);