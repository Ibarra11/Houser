import React, { Component } from 'react';
import PaymentForm from './PaymentForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
class Payment extends Component {
    render() {
        return (
            <div className="component-landing-page">
                <nav className="nav">
                    <div className="nav-logo">
                        <h1><span><i className="fa fa-home"></i></span>ouser</h1>
                    </div>
                    <div className="nav-links">
                        <div className="nav-link">
                            <h3>Go Back</h3>
                        </div>
                    </div>
                </nav>
                <header className="header header-payment">
                    <StripeProvider apiKey="pk_test_W69mdTmwiZ7lJv2OFwiwXUX1">
                        <div className="payment">
                            <Elements>
                                <PaymentForm  />
                            </Elements>
                        </div>
                    </StripeProvider>
                </header>
            </div>
        )
    }
}

export default Payment;