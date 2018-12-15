// import Modal from 'react-awesome-modal';
// export default PropertyModal = () => {
//     return (
//         <div className="modal-container">
//             <Modal
//                 visible={this.state.visible}
//                 width="75%"
//                 height="85%"
//                 effect="fadeInUp"
//                 onClickAway={() => this.closeModal()}
//             >
//                 <div className="modal-content">
//                     <div className="modal-property-img">
//                         <img src={this.state.property_img} alt="an image of the property" />
//                     </div>
//                     <div className="modal-property-form">
//                         <div className="form-header">
//                             <h3>Edit Property</h3>
//                         </div>
//                         <form onSubmit={this.editProperty} >
//                             <div className="form-group">
//                                 <div className="group-header">
//                                     <h5>Property Information</h5>
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="street">Street</label>
//                                     <input name="property_street" onChange={this.onInputChange} type="text" value={this.state.property_street} />
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="city">City</label>
//                                     <input type="text" name="property_city" onChange={this.onInputChange} value={this.state.property_city} />
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="state">State</label>
//                                     <input type="text" name="property_state" onChange={this.onInputChange} value={this.state.property_state} />
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="zipcode">Zipcode</label>
//                                     <input type="text" name="property_zipcode" onChange={this.onInputChange} value={this.state.property_zipcode} />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <div className="group-header">
//                                     <h5>Finances</h5>
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="rent">Rent</label>
//                                     <input name="property_rent" type="text" onChange={this.onInputChange} value={this.state.property_rent} />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <div className="group-header">
//                                     <h5>Tenant Information</h5>
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="name">Name</label>
//                                     <input type="text" name="tenant_name" onChange={this.onInputChange} value={this.state.tenant_name} />
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="street">Phone</label>
//                                     <input type="text" name="tenant_phone" onChange={this.onInputChange} value={this.state.tenant_phone} />
//                                 </div>
//                                 <div className="input-group">
//                                     <label htmlFor="email">Email</label>
//                                     <input type="text" name="tenant_email" onChange={this.onInputChange} value={this.state.tenant_email} />
//                                 </div>

//                             </div>
//                             <div className="form-submit">
//                                 <button type="submit">Edit</button>
//                                 <button onClick={() => this.closeModal}>Close</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     )

// }

