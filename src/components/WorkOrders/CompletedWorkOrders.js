import React, { Component } from "react";
import axios from "axios";
import Pagination from "../../utilities/Pagination";
import WorkOrderList from "./WorkOrderList";
import EditWorkOrder from "./EditWorkOrder";
import { filterCheck } from "../../utilities/Filter";
class CompletedWorkOrders extends Component {
  constructor() {
    super();
    this.state = {
      workOrders: [],
      currentWorkOrders: [],
      editWorkOrder: false,
      workOrderData: {},
      workOrderIndex: 0,
      filteredWorkOrders: [],
      workOrderFilters: {},
      workOrderFilterStatus: {}
    };

    this.paginationInstance = new Pagination([], 6);
    this.currentPage = 1;
    this.getCompletedWorkOrders = this.getCompletedWorkOrders.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  componentDidMount() {
    this.getCompletedWorkOrders();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.workOrders.length > 0) {
      filterCheck(this, prevState);
    }
  }

  componentWillUnmount() {
    this.props.resetFilters();
  }

  getCompletedWorkOrders() {
    axios
      .get("/api/work_orders/completed")
      .then(res => {
        if (res.data.length > 0) {
          this.paginationInstance.itemList = res.data;
          this.paginationInstance.calculateNumOfPages();
          let pageItems = this.paginationInstance.displayItemsOnPage(
            this.currentPage
          );
          this.setState(
            {
              workOrders: res.data,
              currentWorkOrders: pageItems
            },
            this.props.getProperties(res.data)
          );
        } else {
          this.paginationInstance.reset();
          this.setState({ workOrderList: [], workOrdersOnPage: [] });
        }
      })
      .catch(err => console.log(err));
  }

  updateCurrentPage(direction) {
    if (direction === "next") {
      if (this.currentPage < this.paginationInstance.numberOfPages) {
        this.currentPage++;
        this.updatePageItems();
      }
    } else if (direction === "prev") {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePageItems();
      }
    }
  }

  updatePageItems(filters = null) {
    let pageItems = this.paginationInstance.displayItemsOnPage(
      this.currentPage
    );
    let filteredWorkOrders = this.paginationInstance.itemList;
    this.paginationInstance.calculateNumOfPages();
    if (filters) {
      this.setState({
        currentWorkOrders: pageItems,
        filteredWorkOrders
      });
    } else {
      this.setState({
        currentWorkOrders: pageItems,
        filteredWorkOrders: []
      });
    }
  }

  editWorkOrder = (workOrderData, index) => {
    this.setState({
      editWorkOrder: true,
      workOrderData,
      workOrderIndex: index
    });
  };

  cancelEditWorkOrder = newWorkOrderData => {
    if (newWorkOrderData) {
      let updatedWorkOrders = this.state.workOrdersOnPage.slice();
      updatedWorkOrders[this.state.workOrderIndex] = Object.assign(
        updatedWorkOrders[this.state.workOrderIndex],
        { ...newWorkOrderData }
      );
      this.setState({
        editWorkOrder: false,
        workOrdersOnPage: updatedWorkOrders
      });
    } else {
      this.setState({
        editWorkOrder: false
      });
    }
  };

  deleteWorkOrder = workOrderId => {
    axios
      .delete(`/api/workorder/${workOrderId}`)
      .then(() => {
        this.getCompletedWorkOrders();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="completed-jobs">
        <div className="job-header">
          <h4>
            {this.state.editWorkOrder
              ? "Editing Work Order #" + this.state.workOrderData.job_id
              : "Completed Work Orders"}
          </h4>
        </div>
        <div className="completed-jobs-container">
          {this.state.editWorkOrder ? (
            <EditWorkOrder
              cancelEditWorkOrder={this.cancelEditWorkOrder}
              workOrderData={this.state.workOrderData}
            />
          ) : (
            <WorkOrderList
              deleteWorkOrder={this.deleteWorkOrder}
              editWorkOrder={this.editWorkOrder}
              workOrders={this.state.currentWorkOrders}
            />
          )}
        </div>
        {!this.state.editWorkOrder ? (
          <div className="pagination">
            <div
              onClick={() => this.updateCurrentPage("prev")}
              className="pagination-button"
            >
              <i className="fa fa-chevron-circle-left" />
            </div>
            <div className="page-count">
              <p>
                {this.paginationInstance.numberOfPages ? this.currentPage : 0}{" "}
                of {this.paginationInstance.numberOfPages}
              </p>
            </div>
            <div
              onClick={() => this.updateCurrentPage("next")}
              className="pagination-button"
            >
              <i className="fa fa-chevron-circle-right" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CompletedWorkOrders;
