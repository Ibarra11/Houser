import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
class Payments extends Component {

    constructor() {
        super();
        this.state = {
            paymentList: []
        }
    }
    componentDidMount() {
        axios.get('/api/payments')
            .then(payments => {
                console.log(payments);
                if (payments.data.length > 0) {
                    this.setState({ paymentList: payments.data })
                }
            })
            .catch(err => console.log(err))
    }

    renderPaymentTable = () => {
        return this.state.paymentList.map(payment => {
            return (
                <tr key={payment.payment_id}>
                    <td>{payment.payment_id}</td>
                    <td>{moment(payment.payment_date).format("YYYY-MM-DD")}</td>
                    <td>{payment.tenant_name}</td>
                    <td>{payment.property_street}, {payment.property_city}, {payment.property_state} {payment.property_zipcode}</td>
                    <td>{payment.payment_amount}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="component-transactions">
                <div className="transaction-table">
                    <div className="header">
                        <h4>Transaction History</h4>
                    </div>
                    <table className="table-content">
                        <thead className="table-header">
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Tenant</th>
                                <th>Property Address</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">

                            {this.renderPaymentTable()}
                        </tbody>
                    </table>
                </div>
                <div className="transaction-viewer">
                </div>
            </div>
        )
    }
}

export default Payments;