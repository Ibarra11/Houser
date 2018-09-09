import React, { Component } from 'react';

class Step2 extends Component {
    componentDidMount() {
        this.props.onStep('step2');
    }
    render() {
        return (
            <div className="step2">
                <h4 className="wizard-step-title">Financial Information</h4>
                <div className="financial-information">
                    <div className="input-group">
                        <h6>Loan Amount</h6>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Mortgage</h6>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Rent</h6>
                        <input type="text" />
                    </div>
                </div>
                <div className="wizard-controls">
                    <button onClick={() => this.props.updateStep('step1')}>Previous Step</button>
                    <button onClick={() => this.props.updateStep('step3')}>Next Step</button>
                </div>
            </div>
        )
    }
}

export default Step2;