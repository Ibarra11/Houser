import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Pagination from "../../utilities/Pagination";
import Numeral from "numeral";
class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      paymentList: []
    };
    this.paginationInstance = new Pagination([], 6);
    this.currentPage = 1;
  }
  componentDidMount() {
    axios
      .get("/api/payments")
      .then(payments => {
        if (payments.data.length > 0) {
          this.setState({ paymentList: payments.data });
        }
      })
      .catch(err => console.log(err));
  }

  renderPaymentTable = () => {
    return this.state.paymentList.map(payment => {
      return (
        <tr key={payment.payment_id}>
          <td>{payment.payment_id}</td>
          <td>{moment(payment.payment_date).format("YYYY-MM-DD")}</td>
          <td>{payment.tenant_name}</td>
          <td>
            {payment.property_street}, {payment.property_city},{" "}
            {payment.property_state} {payment.property_zipcode}
          </td>
          <td>${Numeral(payment.payment_amount).format("0,0.00")}</td>
        </tr>
      );
    });
  };
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
            <tbody className="table-body">{this.renderPaymentTable()}</tbody>
          </table>
        </div>
        <div className="pagination">
          <div
            onClick={() => this.updateCurrentPage("prev")}
            className="pagination-button"
          >
            <i className="fa fa-chevron-circle-left" />
          </div>
          <div className="page-count">
            <p>
              {this.paginationInstance.numberOfPages ? this.currentPage : 0} of{" "}
              {this.paginationInstance.numberOfPages}
            </p>
          </div>
          <div
            onClick={() => this.updateCurrentPage("next")}
            className="pagination-button"
          >
            <i className="fa fa-chevron-circle-right" />
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
