import React, { Component } from 'react';

class Step5 extends Component {
    componentDidMount() {
        this.props.onStep('step5');
    }

    render() {
        return (
            <div className="step5">
                <h4 className="wizard-step-title">Property Confirmation</h4>
                <p>Please review property information and proceed to add if the information is correct</p>
                <div className="wizard-controls">
                    <button onClick={() => this.props.updateStep('step4')}>Previous Step</button>
                    <button onClick={() => this.props.updateStep('step1')}>Next Step</button>
                </div>
            </div>
        )
    }
}

export default Step5;