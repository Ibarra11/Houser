import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { setPropertyImg } from '../../redux/reducer';
class Step4 extends Component {

    constructor() {
        super();
        this.state = {
            propertyImgFile: ''
        }
        this.onDrop = this.onDrop.bind(this);
        this.resetDropzone = this.resetDropzone.bind(this);
        this.updateWizard = this.updateWizard.bind(this);
    }
    componentDidMount() {
        this.props.onStep('step4');
        this.setState({
            propertyImgFile: this.props.propertyImgFile
        })
    }

    onDrop(file) {
        this.setState({ propertyImgFile: file[0] })
    }

    resetDropzone() {
        this.setState({ propertyImgFile: '' })
    }

    updateWizard(direction) {
        this.props.setPropertyImg(this.state.propertyImgFile);
        direction === 'next' ? this.props.updateStep('step5') : this.props.updateStep('step3');
    }

    render() {

        return (
            <div className="step4">
                <h4 className="wizard-step-title">Property Img</h4>
                <div className="property-img">
                    {this.state.propertyImgFile ?
                        <div className="property-img-content">
                            <img src={this.state.propertyImgFile.preview} alt="property img" />
                            <div className="property-img-buttons">
                                <button onClick={this.resetDropzone}> <i className="fa fa-times"></i></button>
                            </div>
                        </div>
                        :
                        <Dropzone accept="image/jpeg, image/png" className="dropzone" onDrop={this.onDrop}>
                            <p>Click anywhere within this box to upload an image</p>
                        </Dropzone>
                    }
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
    return {
        propertyImgFile: state.propertyImgFile
    }
}


export default connect(mapStateToProps, { setPropertyImg })(Step4);