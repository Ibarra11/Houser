import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFinancialInformation } from '../../redux/reducer';
class Step2 extends Component {

    constructor() {
        super();
        this.state = {
            propertyLoanAmount: 0,
            propertyMortgage: 0,
            propertyRent: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateWizard = this.updateWizard.bind(this);
    }
    componentDidMount() {
        this.props.onStep('step2');
        let { propertyLoanAmount, propertyMortgage, propertyRent } = this.props;
        this.setState({ propertyLoanAmount, propertyMortgage, propertyRent });
    }
    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    updateWizard(direction) {
        let { propertyLoanAmount, propertyMortgage, propertyRent } = this.state;
        console.log(this.state);
        this.props.setFinancialInformation( propertyLoanAmount, propertyMortgage, propertyRent );

        direction === 'next' ? this.props.updateStep('step3') : this.props.updateStep('step1')
    }
    render() {
        return (
            <div className="step2">
                <h4 className="wizard-step-title">Financial Information</h4>
                <div className="financial-information">
                    <div className="input-group">
                        <h6>Loan Amount</h6>
                        <input value={this.state.propertyLoanAmount} name="propertyLoanAmount" onChange={this.handleInputChange} type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Mortgage</h6>
                        <input value={this.state.propertyMortgage} name="propertyMortgage" onChange={this.handleInputChange} type="text" />
                    </div>
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
    
    let { propertyLoanAmount, propertyMortgage, propertyRent } = state;
    return {
        propertyLoanAmount, propertyMortgage, propertyRent
    }
}
export default connect(mapStateToProps, { setFinancialInformation })(Step2);