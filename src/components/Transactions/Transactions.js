import React, { Component } from 'react';

class Transactions extends Component {
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            <tr>
                                <td>1</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>9/20/18</td>
                                <td>Alan Ibarra</td>
                                <td>1675 Ramson Dr, Turlock, Ca</td>
                                <td>920.00</td>
                                <td>
                                    <button><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="transaction-viewer">
                </div>
            </div>
        )
    }
}

export default Transactions;