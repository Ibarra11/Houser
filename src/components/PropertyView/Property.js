import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
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
            tenant_phone, property_rent
        } = this.props.property;
        this.setState({
            property_city, property_street, property_state, property_zipcode, tenant_email,
            tenant_name, tenant_phone, property_rent, property_id, property_img
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
                <div className="modal-container">
                    <Modal
                        visible={this.state.visible}
                        width="75%"
                        height="85%"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div className="modal-content">
                            <div className="modal-property-img">
                                <img src={this.state.property_img} alt="an image of the property" />
                            </div>
                            <div className="modal-property-form">
                                <div className="form-header">
                                    <h3>Edit Property</h3>
                                </div>
                                <form onSubmit={this.editProperty} >
                                    <div className="form-group">
                                        <div className="group-header">
                                            <h5>Property Information</h5>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="street">Street</label>
                                            <input name="property_street" onChange={this.onInputChange} type="text" value={this.state.property_street} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="city">City</label>
                                            <input type="text" name="property_city" onChange={this.onInputChange} value={this.state.property_city} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="state">State</label>
                                            <input type="text" name="property_state" onChange={this.onInputChange} value={this.state.property_state} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input type="text" name="property_zipcode" onChange={this.onInputChange} value={this.state.property_zipcode} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="group-header">
                                            <h5>Finances</h5>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="rent">Rent</label>
                                            <input name="property_rent" type="text" onChange={this.onInputChange} value={this.state.property_rent} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="group-header">
                                            <h5>Tenant Information</h5>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name="tenant_name" onChange={this.onInputChange} value={this.state.tenant_name} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="street">Phone</label>
                                            <input type="text" name="tenant_phone" onChange={this.onInputChange} value={this.state.tenant_phone} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="tenant_email" onChange={this.onInputChange} value={this.state.tenant_email} />
                                        </div>
                                    </div>
                                    <div className="form-submit">
                                        <button type="submit">Edit</button>
                                        <button onClick={() => this.closeModal}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
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
