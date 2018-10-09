import React, { Component } from 'react';
import axios from 'axios';
class CreateWorkOrder extends Component {
    constructor() {
        super();
        this.state = {
            properties: [],
            propertyId: 0
        }
        this.listProperties = this.listProperties.bind(this);
        this.onPropertyChange = this.onPropertyChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/property')
            .then(res => {
                this.setState({ properties: res.data })
            })
            .catch(err => console.log(err));
    }

    listProperties() {
        let tempArr = [];
        for (let i = 0; i < this.state.properties.length; i++) {
            let { property_id, property_city, property_state, property_street, property_zipcode } = this.state.properties[i];
            let option = <option key={property_id} value={property_id}>{property_street}, {property_city}, {property_state} {property_zipcode}</option>;
            tempArr.push(option);
        }
        return tempArr;
    }

    onPropertyChange(e){
        this.setState({
            propertyId: e.target.value
        })
    }

    render() {
        return (
            <div className="add-job">
                <div className="job-order-form">
                    <div className="form-header">
                        <h4>Work Order</h4>
                    </div>
                    <div className="form-body">
                        <div className="form-left-side">
                            <div className="property-information">
                                <h5>Property Information</h5>
                                <div className="input-group">
                                    <h6>Select A Property</h6>
                                    <select onChange={this.onPropertyChange}>
                                        <option value=""></option>
                                        {this.listProperties()}
                                    </select>
                                </div>
                            </div>
                            <div className="company-information">
                                <h5>Company/Worker Information</h5>
                                <div className="input-group">
                                    <h6>Name</h6>
                                    <input type="text" />
                                </div>
                                <div className="input-group">
                                    <h6>Phone Number</h6>
                                    <input type="text" />
                                </div>
                                <div className="input-group">
                                    <h6>Email</h6>
                                    <input type="text" />
                                </div>
                                <div className="input-group">
                                    <h6>Charge</h6>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="form-right-side">
                            <div className="job-description">
                                <h5>Job Description</h5>
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <button>Create</button>
                        <button>Clear</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateWorkOrder;