import React, { Component } from 'react';
import PaymentForm from './PaymentForm';
import { Elements, StripeProvider } from 'react-stripe-elements';
class Payment extends Component {

    handleChange = (e) =>{
        // console.log(e.target.value)
        console.log(e);
    }


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
                            <div className="payment-description">
                                <h1>Houser's Payment System</h1>
                                <p>
                                    Welcome tenants to process a payment fill the information to the right.  If all
                                    the information is correct your payment will be processed and your landlord will be
                                    notified.
                                </p>
                                <button>Submit Payment</button>
                            </div>
                            {/* <div className="tenant-info">
                                <div className="input-group">
                                    <label htmlFor="">Name</label>
                                    <input type="text" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">Last 4 Digits of SSN</label>
                                    <input type="text" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">Amount</label>
                                    <input type="text" />
                                </div>
                            </div> */}
                            <Elements>
                                <PaymentForm handleChange={this.handleChange} />
                            </Elements>
                        </div>
                    </StripeProvider>
                </header>
            </div>
        )
    }
}

export default Payment;