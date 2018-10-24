import React, { Component } from 'react';
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from 'react-stripe-elements';

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ssn: 0,
            amount: 0
        }
    }
    handleSubmit = async () => {
        let { token } = await this.props.stripe.createToken({ name: "Name" });
    }
    handleChange = e => {
        let { value } = e.target;
        if (e.target.name === 'ssn' || e.target.name === 'amount') {
            value = parseInt(e.target.value);
        }
        this.setState({ [e.target.name]: value })
    }
    render() {
        return (
            <div className="payment-form" onSubmit={this.handleSubmit}>
                <div className="payment-description">
                    <h1>Houser's Payment System</h1>
                    <p>
                        Welcome tenants to process a payment fill the information to the right.  If all
                        the information is correct your payment will be processed and your landlord will be
                        notified.
                                </p>
                    <button onClick={this.handleSubmit}>Sumbit Payment</button>
                </div>
                <div className="tenant-info">
                    <div className="input-group">
                        <label htmlFor="">Name</label>
                        <input name='name' onChange={this.handleChange} type="text" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Last 4 Digits of SSN</label>
                        <input name='ssn' onChange={this.handleChange} type="text" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Amount</label>
                        <input name='amount' onChange={this.handleChange} type="text" />
                    </div>
                </div>
                <div className="payment-info">
                    <div className="input-group">
                        Card number
                   <CardNumberElement
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="input-group">
                        Expiration Date
                    <CardExpiryElement
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <div className="input-group">
                        CVC
                    <CardCVCElement
                            onChange={this.props.handleChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default injectStripe(PaymentForm);