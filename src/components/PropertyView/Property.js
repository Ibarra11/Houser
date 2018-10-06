import React, { Component } from 'react';
class Property extends Component {
    render() {
        let {
            property_city, property_id, property_img, property_street,
            property_state, property_zipcode, tenant_email, tenant_name,
            tenant_phone, property_rent
        } = this.props.property;
        return (
            <div className="property">
                <div className="property-img">
                    <img src={property_img} alt="property-img" />
                </div>
                <div className="property-details">
                    <div className="property-address">
                        <h5>Address</h5>
                        <p>Street: {property_street}</p>
                        <p>City: {property_city}</p>
                        <p>State: {property_state}</p>
                        <p>Zipcode: {property_zipcode}</p>
                    </div>
                    <div className="property-rent">
                        <h5>Finances</h5>
                        <p>Rent: ${property_rent}</p>
                    </div>
                    <div className="property-tenants">
                        <h5>Tenant Information</h5>
                        <p> Name: {tenant_name}</p>
                        <p> Phone: {tenant_phone}</p>
                        <p> Email: {tenant_email}</p>
                    </div>
                    <div className="property-actions">
                        <div className="action">
                            <i className="fa fa-edit"></i>
                        </div>
                        <div className="action">
                            <i className="fa fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Property;
