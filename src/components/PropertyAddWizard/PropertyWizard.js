import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
class PropertyWizard extends Component {
    constructor() {
        super();
        this.state = {
            step1: false,
            step2: false,
            step3: false,
            renderStep: 'step1'
        }
        this.onStep = this.onStep.bind(this);
        this.updateStep = this.updateStep.bind(this);
    }
    onStep(step) {
        if (step === 'step1') {
            this.setState({
                step1: true,
                step2: false,
                step3: false
            })
        }
        else if (step === 'step2') {
            this.setState({
                step1: true,
                step2: true,
                step3: false
            })
        }
        else if (step === 'step3') {
            this.setState({
                step1: true,
                step2: true,
                step3: true
            })
        }
    }

    updateStep(step) {
        this.setState({
            renderStep: step
        })
    }
    renderStep() {
        if (this.state.renderStep === 'step1') {
            return <Step1 updateStep={this.updateStep} onStep={this.onStep} />
        }
        else if (this.state.renderStep === 'step2') {
            return <Step2 updateStep={this.updateStep} onStep={this.onStep} />
        }
        else{
            return <Step3 updateStep={this.updateStep} onStep={this.onStep} />
        }
    }
    render() {
        return (
            <div className="component-property-wizard">
                <div className="wizard-steps">
                    <div className={this.state.step1 ? "icon-container active" : "icon-container"}>
                        <i className="fa fa-map-marker"></i>
                    </div>
                    <div className="hr"></div>

                    <div className={this.state.step2 ? "icon-container active" : "icon-container"}>
                        <i className="fa fa-usd"></i>
                    </div>
                    <div className="hr"></div>
                    <div className={this.state.step3 ? "icon-container active" : "icon-container"}>
                        <i className="fa fa-image"></i>
                    </div>
                </div>
                
                {this.renderStep()}

            </div>
        )
    }
}

export default PropertyWizard;