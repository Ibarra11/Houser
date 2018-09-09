import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
class Step3 extends Component {

    componentDidMount() {
        this.props.onStep('step3');
    }

    render() {
        return (
            <div className="step3">
                <h4 className="wizard-step-title">Property Img</h4>
                <div className="property-img">
                    <Dropzone className="dropzone" onDrop={this.onDrop}>
                        <p>Click anywhere within this box to upload an image</p>
                    </Dropzone>
                </div>
                <div className="wizard-controls">
                    <button onClick={() => this.props.updateStep('step2')}>Previous Step</button>
                    <button onClick={() => this.props.updateStep('step1')}>Add Property</button>
                </div>
            </div>
        )
    }
}

export default Step3;