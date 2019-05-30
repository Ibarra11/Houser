import React, { Component } from "react";
import WorkOrderQueue from "./WorkOrderQueue";
import CreateWorkOrder from "./CreateWorkOrder";
import CompletedWorkOrders from "./CompletedWorkOrders";
import FilterWorkOrder from "./FilterWorkOrder";
class WorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: (
        <CreateWorkOrder renderView={() => this.renderView("WorkOrderQueue")} />
      )
    };
    this.renderView = this.renderView.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }
  renderView(view) {
    if (view === "CreateWorkOrder") {
      this.setState({
        view: (
          <CreateWorkOrder
            renderView={() => this.renderView("WorkOrderQueue")}
          />
        )
      });
    } else if (view === "WorkOrderQueue") {
      this.setState({ view: <WorkOrderQueue /> });
    } else if (view === "CompletedWorkOrders") {
      this.setState({ view: <CompletedWorkOrders /> });
    }
  }
  addFilter() {}
  render() {
    console.log(this.state);
    return (
      <div className="component-workOrders">
        <div className="control-panel">
          <div className="control-panel-header">
            <h3>Work Orders</h3>
            <h5>Control Panel</h5>
          </div>
          <div className="controls">
            <div
              onClick={() => this.renderView("CreateWorkOrder")}
              className="controls-link"
            >
              Create Work Order
            </div>
            <div
              onClick={() => this.renderView("WorkOrderQueue")}
              className="controls-link"
            >
              {" "}
              Work Order Queue
            </div>
            <div
              onClick={() => this.renderView("CompletedWorkOrders")}
              className="controls-link"
            >
              Completed Work Orders
            </div>
          </div>
          {this.state.view.type.name !== "CreateWorkOrder" ? (
            <FilterWorkOrder />
          ) : null}
        </div>
        <div className="component-views">{this.state.view}</div>
      </div>
    );
  }
}

export default WorkOrders;
