import React, { Component } from 'react';
import PropertyModal from './PropertyModal';
import axios from 'axios';
class Property extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            property_city: '',
            property_street: '',
            property_state: '',
            property_zipcode: 0,
            tenant_email: '',
            tenant_name: '',
            tenant_phone: '',
            tenant_ssn: '',
            property_rent: '',
            property_id: '',
            property_img: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.editProperty = this.editProperty.bind(this);
    }

    componentDidMount() {
        let {
            property_city, property_id, property_img, property_street,
            property_state, property_zipcode, tenant_email, tenant_name,
            tenant_phone, tenant_ssn, property_rent
        } = this.props.property;
        this.setState({
            property_city, property_street, property_state, property_zipcode, tenant_email,
            tenant_name, tenant_phone, tenant_ssn, property_rent, property_id, property_img
        })
    }
    openModal() {
        this.setState({
            visible: true
        })
    }

    closeModal() {
        this.setState({
            visible: false
        })
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    editProperty(e) {
        e.preventDefault();
        axios.put(`/api/property/${this.state.property_id}`, this.state)
            .then(() => {
                this.closeModal();
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="property">
                <div className="property-img">
                    <img src={this.state.property_img} alt="property-img" />
                </div>
                <div className="property-details">
                    <div className="property-address">
                        <h5>Address</h5>
                        <p>Street: {this.state.property_street}</p>
                        <p>City: {this.state.property_city}</p>
                        <p>State: {this.state.property_state}</p>
                        <p>Zipcode: {this.state.property_zipcode}</p>
                    </div>
                    <div className="property-rent">
                        <h5>Finances</h5>
                        <p>Rent: ${this.state.property_rent}</p>
                    </div>
                    <div className="property-tenants">
                        <h5>Tenant Information</h5>
                        <p> Name: {this.state.tenant_name}</p>
                        <p> Phone: {this.state.tenant_phone}</p>
                        <p> Email: {this.state.tenant_email}</p>
                        <p> Last 4 of SSN: {this.state.tenant_ssn}</p>
                    </div>
                    <div className="property-actions">
                        <div onClick={this.openModal} className="action">
                            <i className="fa fa-edit"></i>
                        </div>
                        <div onClick={() => this.props.deleteProperty(this.state.property_id)} className="action">
                            <i className="fa fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Property;
