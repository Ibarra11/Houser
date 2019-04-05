import React, { Component } from "react";
import axios from "axios";
import Pagination from "../../utilities/Pagination";
import WorkOrderQueueList from "./WorkOrderQueueList";
class WorkOrderQueue extends Component {
  constructor() {
    super();
    this.state = {
      workOrders: [],
      currentWorkOrders: []
    };

    this.paginationInstance = new Pagination([], 5);
    this.currentPage = 1;
    this.getWorkOrdersFromQueue = this.getWorkOrdersFromQueue.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
  }
  componentDidMount() {
    this.getWorkOrdersFromQueue();
  }

  getWorkOrdersFromQueue() {
    axios
      .get("/api/work_orders")
      .then(res => {
        if (res.data.length > 0) {
          this.paginationInstance.itemList = res.data;
          this.paginationInstance.calculateNumOfPages();
          let pageItems = this.paginationInstance.displayItemsOnPage(
            this.currentPage
          );
          this.setState({
            workOrders: res.data,
            currentWorkOrders: pageItems
          });
        } else {
          this.paginationInstance.reset();
          this.setState({
            workOrders: res.data,
            currentWorkOrders: []
          });
        }
      })
      .catch(err => console.log(err));
  }

  updatePageItems() {
    let pageItems = this.paginationInstance.displayItemsOnPage(
      this.currentPage
    );
    this.setState({
      currentWorkOrders: pageItems
    });
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

  removeFromQueue(jobId) {
    axios
      .put(`/api/work_orders/${jobId}`)
      .then(() => {
        this.getWorkOrdersFromQueue();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="job-queue">
        <div className="job-queue-header">
          <h4>
            Work Order Queue{" "}
            <span className="job-number">
              ({this.paginationInstance.itemList.length} Work Orders)
            </span>
          </h4>
        </div>
        <div className="job-queue-container">
          <WorkOrderQueueList
            removeFromQueue={this.removeFromQueue}
            queueList={this.state.currentWorkOrders}
          />
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

export default WorkOrderQueue;
