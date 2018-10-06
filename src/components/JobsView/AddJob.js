import React, { Component } from 'react';

class AddJob extends Component {
    render() {
        return (
            <div className="add-job">
                <div className="job-order-form">
                    <div className="form-header">
                        <h4>Job Order</h4>
                    </div>
                    <div className="form-body">
                        <div className="form-left-side">
                            <div className="property-information">
                                <h5>Property Information</h5>
                                <div className="input-group">
                                    <h6>Select A Property</h6>
                                    <select>
                                        <option value=""></option>
                                        <option value="">1675 Ramson Dr</option>
                                        <option value="">2600 Dels Lane </option>
                                        <option value=""></option>
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

export default AddJob;