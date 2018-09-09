import React, { Component } from 'react';

class Step1 extends Component {
    componentDidMount() {
        this.props.onStep('step1');
        this.props.updateStep('step1');
    }
    render() {
        return (
            <div className="step1">
                <h4 className="wizard-step-title">Property Address</h4>
                <div className="address-information">
                    <div className="input-group">
                        <h6>City</h6>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <h6>State</h6>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Zipcode</h6>
                        <input type="text" />
                    </div>
                </div>
                <div className="wizard-controls">
                    <button onClick={() => this.props.updateStep('step2')}>Next Step</button>
                </div>
            </div>
        )
    }
}

export default Step1;