import React, { Component } from "react";
import WorkOrderQueue from "./WorkOrderQueue";
import CreateWorkOrder from "./CreateWorkOrder";
import CompletedWorkOrders from "./CompletedWorkOrders";
import FilterWorkOrder from "./FilterWorkOrder";
class WorkOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "CreateWorkOrder",
      filters: {},
      workOrderProperties: []
    };
    this.renderView = this.renderView.bind(this);
    this.setFilters = this.setFilters.bind(this);
  }
  renderView() {
    let { view } = this.state;
    if (view === "CreateWorkOrder") {
      return (
        <CreateWorkOrder
          renderView={() => this.setState({ view: "WorkOrderQueue" })}
        />
      );
    } else if (view === "WorkOrderQueue") {
      return (
        <WorkOrderQueue
          getProperties={properties =>
            this.setState({ workOrderProperties: properties })
          }
          filters={this.state.filters}
        />
      );
    } else if (view === "CompletedWorkOrders") {
      return <CompletedWorkOrders />;
    }
  }
  setFilters(filterList) {
    this.setState({
      filters: filterList
    });
  }
  render() {
    return (
      <div className="component-workOrders">
        <div className="control-panel">
          <div className="control-panel-header">
            <h3>Work Orders</h3>
            <h5>Control Panel</h5>
          </div>
          <div className="controls">
            <div
              onClick={() => this.setState({ view: "CreateWorkOrder" })}
              className="controls-link"
            >
              Create Work Order
            </div>
            <div
              onClick={() => this.setState({ view: "WorkOrderQueue" })}
              className="controls-link"
            >
              {" "}
              Work Order Queue
            </div>
            <div
              onClick={() => this.setState({ view: "CompletedWorkOrders" })}
              className="controls-link"
            >
              Completed Work Orders
            </div>
          </div>
          {this.state.view !== "CreateWorkOrder" ? (
            <FilterWorkOrder
              properties={this.state.workOrderProperties}
              setFilters={this.setFilters}
            />
          ) : null}
        </div>
        <div className="component-views">{this.renderView()}</div>
      </div>
    );
  }
}

export default WorkOrders;
