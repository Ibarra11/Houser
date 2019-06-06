import React, { Component } from "react";
import axios from "axios";
import Pagination from "../../utilities/Pagination";
import WorkOrderQueueList from "./WorkOrderQueueList";
class WorkOrderQueue extends Component {
  constructor() {
    super();
    this.state = {
      workOrders: [],
      filteredWorkOrders: [],
      workOrderFilters: {},
      currentWorkOrders: []
    };
    this.paginationInstance = new Pagination([], 5);
    this.currentPage = 1;
    this.getWorkOrdersFromQueue = this.getWorkOrdersFromQueue.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.filterQueue = this.filterQueue.bind(this);
  }
  componentDidMount() {
    this.getWorkOrdersFromQueue();
  }

  componentDidUpdate(prevProps, prevState) {
    let updateFlag = false;
    let filters = Object.assign({}, this.state.workOrderFilters);
    let currentFilterLength = Object.keys(this.props.filters).length;
    let previousFilterLength = Object.keys(prevState.workOrderFilters).length;
    if (previousFilterLength > currentFilterLength) {
      this.setState(
        {
          workOrderFilters: this.props.filters
        },
        this.filterQueue
      );
    } else if (currentFilterLength > 0) {
      for (let prop in this.props.filters) {
        if (!this.state.workOrderFilters[prop]) {
          updateFlag = true;
          filters[prop] = this.props.filters[prop];
        } else if (
          this.state.workOrderFilters[prop] !== this.props.filters[prop]
        ) {
          updateFlag = true;
          filters[prop] = this.props.filters[prop];
        }
      }
      if (updateFlag) {
        this.setState({ workOrderFilters: filters }, this.filterQueue);
      }
    }
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
          this.setState(
            {
              workOrders: res.data,
              currentWorkOrders: pageItems
            },
            this.props.getProperties(res.data)
          );
        } else {
          this.paginationInstance.reset();
          this.setState(
            {
              workOrders: res.data,
              currentWorkOrders: []
            },
            this.props.getProperties([])
          );
        }
      })
      .catch(err => console.log(err));
  }

  filterQueue() {
    let filters = Object.assign({}, this.state.workOrderFilters);
    if (Object.keys(filters).length > 0) {
      let queue;
      if (this.state.filteredWorkOrders.length > 0) {
        queue = this.state.filteredWorkOrders.slice();
      } else {
        queue = this.state.workOrders.slice();
      }
      let order;
      let filteredQueue;
      for (let filter in filters) {
        order = filters[filter];
        if (filter === "Job Id") {
          let firstCurrentWorkOrder = this.state.currentWorkOrders[0].job_id;
          let lastCurrentWorkOrder = this.state.currentWorkOrders[
            this.state.currentWorkOrders.length - 1
          ].job_id;
          if (order === "ASC" && firstCurrentWorkOrder > lastCurrentWorkOrder) {
            filteredQueue = queue.reverse();
            console.log(filteredQueue);
            this.paginationInstance.itemList = filteredQueue;
            this.updatePageItems(true);
          } else if (
            order === "DESC" &&
            firstCurrentWorkOrder < lastCurrentWorkOrder
          ) {
            filteredQueue = queue.reverse();
            console.log(filteredQueue);
            this.paginationInstance.itemList = filteredQueue;
            this.updatePageItems(true);
          }
        } else if (filter === "Property") {
        } else if (filter === "Date") {
          if (filter === "Job Id") {
            if (order === "ASC") {
            } else {
            }
          }
        }
      }
    } else {
      this.paginationInstance.itemList = this.state.workOrders;
      this.updatePageItems();
    }
  }

  updatePageItems(filters = null) {
    let pageItems = this.paginationInstance.displayItemsOnPage(
      this.currentPage
    );
    if (filters) {
      this.setState({
        currentWorkOrders: pageItems,
        filteredWorkOrders: this.paginationInstance.itemList
      });
    } else {
      this.setState({
        currentWorkOrders: pageItems,
        filteredWorkOrders: []
      });
    }
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
