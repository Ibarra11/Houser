import React, { Component } from 'react';

class Step3 extends Component {
    componentDidMount(){
       this.props.onStep('step3'); 
    }
    render() {
        return (
            <div className="step3">
                <h4 className="wizard-step-title">Tenant Information</h4>
                <p>Fill out information if the propery is currently rented otherwise leave blank.</p>
                <div className="tenant-information">
                    <div className="input-group">
                        <h6>Name</h6>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <h6>Contact Number</h6>
                        <input type="tel" />
                    </div>
                    <div className="input-group">
                        <h6>Email Address </h6>
                        <input type="email" />
                    </div>
                </div>
                <div className="wizard-controls">
                    <button onClick={() => this.props.updateStep('step2')}>Previous Step</button>
                    <button onClick={() => this.props.updateStep('step4')}>Next Step</button>
                </div>
            </div>
        )
    }
}
export default Step3;