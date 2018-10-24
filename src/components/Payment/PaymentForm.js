import React, { Component } from 'react';
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from 'react-stripe-elements';

class PaymentForm extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = async (ev) => {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log(token)
    }
    render() {
        return (
            <div className="payment-form">
                <form onSubmit={this.handleSubmit}>
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
                </form>
            </div>
        )
    }
}

export default injectStripe(PaymentForm);