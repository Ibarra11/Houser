import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
class PropertyWizard extends Component {
    render() {
        return (
            <div className="component-property-wizard">

                <div className="wizard-steps">
                    <div className="icon-container">
                        <i className="fa fa-map-marker"></i>
                    </div>
                    <div className="hr"></div>

                    <div className="icon-container">
                        <i className="fa fa-usd"></i>
                    </div>
                    <div className="hr"></div>
                    <div className="icon-container">
                        <i className="fa fa-image"></i>
                    </div>
                </div>
                <div className="property-img">
                    <h4>Property Image</h4>
                    <Dropzone className="dropzone" onDrop={this.onDrop}>
                        <p>Click anywhere within this box to upload an image</p>
                    </Dropzone>
                </div>
                <div className="wizard-controls">
                    <button>Next Step</button>
                </div>
            </div>
        )
    }
}

export default PropertyWizard;