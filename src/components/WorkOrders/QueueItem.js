import React, { Component } from "react";
import moment from "moment";

class QueueItem extends Component {
  constructor() {
    super();
    this.state = {
      displayWorkOrderInfo: false,
      workOrderData: {}
    };
    this.renderCtrl = this.renderCtrl.bind(this);
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  renderCtrl() {
    let { data } = this.props;
    let newDate = moment(data.date_created).format("YYYYMMDD");
    let timeElapsed = moment(newDate, "YYYYMMDD")
      .fromNow()
      .split(" ");
    if (timeElapsed[0] === "a") {
      timeElapsed[0] = 1;
    }
    if (this.state.displayWorkOrderInfo) {
      return (
        <div key={this.props.data.job_id} className="job">
          <div className="job-id">Job Id: {this.props.data.job_id}</div>
          <div className="company-info">
            <div className="company-contact">
              <div className="company-name">{data.company_name}</div>
              <div className="company-phone">{data.company_phone}</div>
            </div>
            <div className="address">
              {data.company_address +
                " " +
                data.company_city +
                ", " +
                data.company_state +
                " " +
                data.company_zipcode}
            </div>
            <div className="work-description">
              <div className="text">{data.work_description}</div>
            </div>
          </div>
          <div className="job-controls">
            <div
              onClick={() => this.setState({ displayWorkOrderInfo: false })}
              className="action"
            >
              {" "}
              <i className="fa fa-times" />
            </div>
            <div
              onClick={() => this.props.removeFromQueue(data.job_id)}
              className="action"
            >
              {" "}
              <i className="fa fa-check-circle" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={this.props.data.job_id} className="job">
          <div className="job-id">Job Id: {this.props.data.job_id}</div>
          <div className="address">
            {data.property_street +
              " " +
              data.property_city +
              ", " +
              data.property_state +
              " " +
              data.property_zipcode}
          </div>
          <div className="job-date">
            <div className="date">{data.date_created}</div>
            <div className="time">{data.time_created}</div>
          </div>
          <div className="job-elapsed-time">
            {timeElapsed[0] + " " + timeElapsed[1]}
          </div>
          <div className="job-controls">
            <div
              onClick={() => this.setState({ displayWorkOrderInfo: true })}
              className="action"
            >
              {" "}
              <i className="fa fa-tools" />
            </div>
            <div
              onClick={() => this.props.removeFromQueue(data.job_id)}
              className="action"
            >
              {" "}
              <i className="fa fa-check-circle" />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.renderCtrl();
  }
}

export default QueueItem;
