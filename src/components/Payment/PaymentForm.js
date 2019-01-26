import React, { Component } from 'react';
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ssn: '',
            amount: '',
            isLoading: false,
            displayTransactionReciept: false,
            paymentError: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isLoading && this.state.isLoading) {
            this.processPayment();
        }
    }

    processPayment = async () => {
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        await axios.post('/api/payment', { token, ...this.state }).then(() =>{
            this.setState({ isLoading: false, displayTransactionReciept: true });
        }).catch(() => this.setState({isLoading: false, paymentError: true}));
    }

    handleChange = e => {
        let { value } = e.target;
        if (e.target.name === 'ssn' || e.target.name === 'amount') {
            value = parseInt(e.target.value);
            if (value) {
                this.setState({ [e.target.name]: value })
            }
            else {
                this.setState({ [e.target.name]: '' })
            }
        }
        else {
            this.setState({ [e.target.name]: value })
        }
    }

    displayLoader = () => {
        this.setState({ isLoading: true })
    }

    closeReciept = () => {
        this._cardNumber.clear();
        this._expirationDate.clear();
        this._cardCVE.clear();
        this.setState({
            displayTransactionReciept: false,
            name: '',
            ssn: '',
            amount: ''
        });
    }

    printReceipt = () => {
        var mywindow = window.open('', 'Print', 'height=600, width=1000');
        mywindow.document.writeln('<html><head>');
        mywindow.document.writeln('</head><body style="text-align:center;">');
        mywindow.document.writeln(document.querySelector('.payment-container').innerHTML);
      
        mywindow.document.writeln('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
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
                    <button onClick={this.displayLoader}>Sumbit Payment</button>
                </div>
                {this.state.isLoading ?
                    <div className="loader-container">
                        <h2>Processing Payment</h2>
                        <BeatLoader
                            size={35}
                            color={"#fff"}
                            loading={this.state.loading}
                        />
                    </div>
                    : this.state.displayTransactionReciept ?
                        <div className="payment-container">
                            <h2>Payment Receipt</h2>
                            <div className="payment-info">
                                <div className="payment-group">
                                    <h5>Payment Id: </h5>
                                    <p>123</p>
                                </div>
                                <div className="payment-group">
                                    <h5>Payment Date: </h5>
                                    <p>10/25/18</p>
                                </div>
                                <div className="payment-group">
                                    <h5>Payment Time: </h5>
                                    <p>9:39</p>
                                </div>
                                <div className="payment-group">
                                    <h5>Payment Amount: </h5>
                                    <p>1,000</p>
                                </div>
                                <div className="payment-group">
                                    <h5>Tenant Name: </h5>
                                    <p>Alan Ibarra</p>
                                </div>
                                <div className="payment-group">
                                    <h5>Property Address: </h5>
                                    <p>3561 Glenville Ct, Turlock CA 95382</p>
                                </div>
                            </div>
                            <div className="payment-controls">
                                <i onClick={this.printReceipt} className='fa fa-print'></i>
                                <i onClick={this.closeReciept} className='fa fa-times'></i>
                            </div>
                        </div>
                        : null
                }
                <div className={this.state.isLoading || this.state.displayTransactionReciept ? "hidden" : "form-data"}>
                    <div className="tenant-info">
                        <div className="input-group">
                            <label htmlFor="">Name</label>
                            <input value={this.state.name} name='name' onChange={this.handleChange} type="text" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Last 4 Digits of SSN</label>
                            <input value={this.state.ssn} name='ssn' onChange={this.handleChange} type="text" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Amount</label>
                            <input value={this.state.amount} name='amount' onChange={this.handleChange} type="text" />
                        </div>
                    </div>
                    <div className="payment-info">
                        <div className="input-group">
                            Card number
                   <CardNumberElement
                                onChange={this.props.handleChange}
                                onReady={element => this._cardNumber = element}
                            />
                        </div>
                        <div className="input-group">
                            Expiration Date
                    <CardExpiryElement
                                onChange={this.props.handleChange}
                                onReady={element => this._expirationDate = element}
                            />
                        </div>
                        <div className="input-group">
                            CVC
                    <CardCVCElement
                                onChange={this.props.handleChange}
                                onReady={element => this._cardCVE = element}
                            />
                        </div>
                    </div>
                </div>
                {this.state.paymentError ? 
                <div className="payment-err">
                    <h6>There was an issue processing your payment.  Verify that you have entered a valid tentant name and SSN.</h6>
                </div>
                : null
                }
            </div>
        )
    }
}

export default injectStripe(PaymentForm);