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
      workOrderFilterStatus: {},
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
    if (this.state.workOrders.length > 0) {
      let updateFlag = false;
      let filters = Object.assign({}, this.state.workOrderFilters);
      let filterStatus = Object.assign({}, this.state.workOrderFilterStatus);
      let currentFilterLength = Object.keys(this.props.filters).length;
      let previousFilterLength = Object.keys(prevState.workOrderFilters).length;

      if (
        previousFilterLength > currentFilterLength ||
        (currentFilterLength === 0 && this.state.filteredWorkOrders.length > 0)
      ) {
        this.filterQueue();
      } else if (currentFilterLength > 0) {
        for (let prop in this.props.filters) {
          if (!this.state.workOrderFilters[prop]) {
            updateFlag = true;
            filters[prop] = this.props.filters[prop];
            filterStatus[prop] = "NEW";
          } else if (
            this.state.workOrderFilters[prop] !== this.props.filters[prop]
          ) {
            filterStatus[prop] = "UPDATED";
            updateFlag = true;
            filters[prop] = this.props.filters[prop];
          }
        }
        if (updateFlag) {
          this.setState(
            { workOrderFilters: filters, workOrderFilterStatus: filterStatus },
            this.filterQueue
          );
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.resetFilters();
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

      let filteredQueue;
      for (let filter in filters) {
        if (filter === "Job Id") {
          let filterStatus = Object.assign(
            {},
            this.state.workOrderFilterStatus
          );
          if (!this.props.filters[filter]) {
            filteredQueue = queue.reverse();
            this.paginationInstance.itemList = filteredQueue;
            delete filterStatus[filter];
            this.setState(
              {
                workOrderFilters: this.props.filters,
                workOrderFilterStatus: filterStatus
              },
              this.updatePageItems(true)
            );
          } else if (
            this.state.workOrderFilterStatus[filter] === "NEW" ||
            this.state.workOrderFilterStatus[filter] === "UPDATED"
          ) {
            let filterStatus = Object.assign(
              {},
              this.state.workOrderFilterStatus
            );
            filteredQueue = queue.reverse();
            filterStatus[filter] = "APPLIED";
            this.paginationInstance.itemList = filteredQueue;
            this.setState(
              {
                workOrderFilterStatus: filterStatus
              },
              this.updatePageItems(true)
            );
          }
        } else if (filter === "Property") {
          let filterStatus = Object.assign(
            {},
            this.state.workOrderFilterStatus
          );
          if (!this.props.filters[filter]) {
            this.paginationInstance.itemList = this.state.workOrders;
            delete filterStatus[filter];
            this.setState(
              {
                workOrderFilters: this.props.filters,
                workOrderFilterStatus: filterStatus
              },
              this.updatePageItems(true)
            );
          } else if (
            this.state.workOrderFilterStatus[filter] === "NEW" ||
            this.state.workOrderFilterStatus[filter] === "UPDATED"
          ) {
            let street, state, zipcode, city;
            let filteredProperties = [];
            filterStatus[filter] = "APPLIED";
            queue =
              this.state.workOrderFilterStatus[filter] === "UPDATED"
                ? this.state.workOrders
                : queue;
            for (let i = 0; i < queue.length; i++) {
              street = queue[i].property_street;
              city = queue[i].property_city;
              state = queue[i].property_state;
              zipcode = queue[i].property_zipcode;

              if (
                filters[filter] === `${street} ${city}, ${state} ${zipcode}`
              ) {
                filteredProperties.push(queue[i]);
              }
            }
            this.paginationInstance.itemList = filteredProperties;
            if (this.state.workOrderFilters["Job Id"] === "DESC") {
              filterStatus["Job Id"] = "UPDATED";
            }
            this.setState(
              {
                workOrderFilterStatus: filterStatus,
                filteredWorkOrders: filteredProperties
              },
              this.filterQueue
            );
          }
        }
      }
    } else {
      this.setState(
        {
          filteredWorkOrders: []
        },
        () => {
          this.paginationInstance.itemList = this.state.workOrders;
          this.updatePageItems();
        }
      );
    }
  }

  updatePageItems(filters = null) {
    let pageItems = this.paginationInstance.displayItemsOnPage(
      this.currentPage
    );
    let filteredWorkOrders = this.paginationInstance.itemList;
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
