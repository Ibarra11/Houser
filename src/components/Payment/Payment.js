import React, { Component } from 'react';
import PaymentForm from './PaymentForm';
import { Link } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
class Payment extends Component {
    render() {
        return (
            <div className="component-landing-page">
                <nav className="nav">
                    <div className="nav-logo">
                        <h1><Link to='/'><span><i className="fa fa-home"></i></span>ouser</Link></h1>
                    </div>
                    <div className="nav-links">
                        <div className="nav-link">
                            <h3> <Link to='/'> <i className="fa fa-arrow-left"></i> Go Back</Link></h3>
                        </div>
                    </div>
                </nav>
                <header className="header header-payment">
                    <StripeProvider apiKey="pk_test_W69mdTmwiZ7lJv2OFwiwXUX1">
                        <div className="payment">
                            <Elements>
                                <PaymentForm />
                            </Elements>
                        </div>
                    </StripeProvider>
                </header>
            </div>
        )
    }
}

export default Payment;