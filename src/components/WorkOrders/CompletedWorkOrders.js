import React, { Component } from 'react';

class CompletedWorkOrders extends Component {
    render() {
        return (
            <div className="completed-jobs">
                <div className="job-header">
                    <h4>Completed Jobs</h4>
                </div>
                <div className="completed-jobs-container">
                    <div className="job-card">
                        <div className="card-img-header">
                            <img src="https://picsum.photos/300/?random" alt="" />
                            <div className="card-overlay">
                                <div className="job-id">
                                    <h5>Job #1</h5>
                                </div>
                                <div className="property-address">
                                    <p>3561 Glenville CT, Turlock, CA 95382</p>
                                </div>
                                <div className="card-controls">
                                    <i className="fa fa-eye"></i>
                                    <i className="fa fa-edit"></i>
                                    <i className="fa fa-trash"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="job-card">
                        <div className="card-img-header">
                            <img src="https://picsum.photos/300/?random" alt="" />
                        </div>
                        {/* <div className="card-panel">
                            <div>Property Information</div>
                            <div>Company/Worker Information</div>
                            <div>Job Description</div>
                        </div>
                        <div className="card-view">

                        </div> */}
                    </div>
                    <div className="job-card">
                        <div className="card-img-header">
                            <img src="https://picsum.photos/300/?random" alt="" />
                        </div>
                        {/* <div className="card-panel">
                            <div>Property Information</div>
                            <div>Company/Worker Information</div>
                            <div>Job Description</div>
                        </div>
                        <div className="card-view">

                        </div> */}
                    </div>
                    <div className="job-card">
                        <div className="card-img-header">
                            <img src="https://picsum.photos/300/?random" alt="" />
                        </div>
                        {/* <div className="card-panel">
                            <div>Property Information</div>
                            <div>Company/Worker Information</div>
                            <div>Job Description</div>
                        </div>
                        <div className="card-view">

                        </div> */}
                    </div>
                    <div className="job-card">
                        <div className="card-img-header">
                            <img src="https://picsum.photos/300/?random" alt="" />
                        </div>
                        {/* <div className="card-panel">
                            <div>Property Information</div>
                            <div>Company/Worker Information</div>
                            <div>Job Description</div>
                        </div>
                        <div className="card-view">

                        </div> */}
                    </div>
                    <div className="job-card">
                        <div className="card-img-header">
                            <img src="https://picsum.photos/300/?random" alt="" />
                        </div>
                        {/* <div className="card-panel">
                            <div>Property Information</div>
                            <div>Company/Worker Information</div>
                            <div>Job Description</div>
                        </div>
                        <div className="card-view">

                        </div> */}
                    </div>
                </div>
                <div className="jobs-pagination">
                    <button>Next</button>
                    <button>Back</button>
                </div>
            </div>
        )
    }
}

export default CompletedWorkOrders;