import React, { Component } from 'react';
class EditProperty extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        console.log(this.props);
    }
    onInputChange(e) {
        console.log(e.target.value);
    }
    render() {
        return (
            <div className="component-edit-property" >
                <div className="property-img">
                    <img src={this.props.property.property_img} alt="an image of the property" />
                </div>
                <form className="edit-property-form">
                    <div className="form-group">
                        <div className="group-header">
                            <h5>Address</h5>
                        </div>
                        <div className="input-group">
                            <label htmlFor="street">Street</label>
                            <input name="property_street" onChange={this.onInputChange} type="text" value={this.props.property.property_street} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">City</label>
                            <input type="text" name="property_city" onChange={this.onInputChange} value={this.props.property.property_city} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="state">State</label>
                            <input type="text" name="property_state" onChange={this.onInputChange} value={this.props.property.property_state} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input type="text" name="property_zipcode" onChange={this.onInputChange} value={this.props.property.property_zipcode} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group-header">
                            <h5>Finances</h5>
                        </div>
                        <div className="input-group">
                            <label htmlFor="rent">Rent</label>
                            <input name="property_rent" type="text" onChange={this.onInputChange} value={this.props.property.property_rent} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group-header">
                            <h5>Tenant Information</h5>
                        </div>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="tenant_name" onChange={this.onInputChange} value={this.props.property.tenant_name} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="name">Last 4 of SSN</label>
                            <input type="text" name="tenant_ssn" onChange={this.onInputChange} value={this.props.property.tenant_ssn} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="street">Phone</label>
                            <input type="text" name="tenant_phone" onChange={this.onInputChange} value={this.props.property.tenant_phone} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="tenant_email" onChange={this.onInputChange} value={this.props.property.tenant_email} />
                        </div>
                    </div>
                    <div className="form-submit">
                        <button className="btn" type="submit">Edit</button>
                        <button className="btn" onClick={() => this.closeModal}>Close</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default EditProperty;