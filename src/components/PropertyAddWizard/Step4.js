import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
class Step4 extends Component {

    constructor() {
        super();
        this.state = {
            propertyImg: ''
        }
        this.onDrop = this.onDrop.bind(this);
        this.resetDropzone = this.resetDropzone.bind(this);
    }
    componentDidMount() {
        this.props.onStep('step4');
    }

    onDrop(file) {
        console.log(file);
        let imgPreview = file[0].preview
        this.setState({ propertyImg: imgPreview })
    }

    resetDropzone(){
        this.setState({propertyImg: ''})
    }

    render() {
        return (
            <div className="step4">
                <h4 className="wizard-step-title">Property Img</h4>
                <div className="property-img">
                    {this.state.propertyImg ?
                        <div className="property-img-content">
                            <img src={this.state.propertyImg} alt="" />
                            <div className="property-img-buttons">
                                <button onClick={this.resetDropzone}> <i className="fa fa-times"></i></button>
                                {/* <button> <i className="fa fa-check"></i></button> */}
                            </div>
                        </div>
                        :
                        <Dropzone accept="image/jpeg, image/png" className="dropzone" onDrop={this.onDrop}>
                            <p>Click anywhere within this box to upload an image</p>
                        </Dropzone>
                    }
                </div>
                <div className="wizard-controls">
                    <button onClick={() => this.props.updateStep('step3')}>Previous Step</button>
                    <button onClick={() => this.props.updateStep('step5')}>Next Step</button>
                </div>
            </div>
        )
    }
}

export default Step4;