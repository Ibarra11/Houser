module.exports = {
  filterCheck: (context, prevState) => {
    let updateFlag = false;
    let filters = Object.assign({}, context.state.workOrderFilters);
    let filterStatus = Object.assign({}, context.state.workOrderFilterStatus);
    let currentFilterLength = Object.keys(context.props.filters).length;
    let previousFilterLength = Object.keys(prevState.workOrderFilters).length;

    if (
      previousFilterLength > currentFilterLength ||
      (currentFilterLength === 0 && context.state.filteredWorkOrders.length > 0)
    ) {
      module.exports.filterQueue(context);
    } else if (currentFilterLength > 0) {
      for (let prop in context.props.filters) {
        if (!context.state.workOrderFilters[prop]) {
          updateFlag = true;
          filters[prop] = context.props.filters[prop];
          filterStatus[prop] = "NEW";
        } else if (
          context.state.workOrderFilters[prop] !== context.props.filters[prop]
        ) {
          filterStatus[prop] = "UPDATED";
          updateFlag = true;
          filters[prop] = context.props.filters[prop];
        }
      }
      if (updateFlag) {
        module.exports.filterQueue(context, filters, filterStatus);
      }
    }
  },
  filterQueue: (
    context,
    filters = context.state.workOrderFilters,
    filterStatus = context.state.workOrderFilterStatus
  ) => {
    let filterLength = Object.keys(filters).length;

    let queue;
    let filteredQueue;

    if (context.state.filteredWorkOrders.length > 0) {
      queue = context.state.filteredWorkOrders.slice();
    } else {
      queue = context.state.workOrders.slice();
    }

    if (filterLength > 0 && queue.length > 1) {
      for (let filter in filters) {
        if (filter === "Job Id") {
          let order = filters[filter];
          let firstWorkOrder = queue[0].job_id;
          let secondWorkOrder = queue[1].job_id;
          if (
            !context.props.filters[filter] &&
            firstWorkOrder > secondWorkOrder
          ) {
            filteredQueue = queue.reverse();
            context.paginationInstance.itemList = filteredQueue;
            delete filterStatus[filter];
            context.setState(
              {
                workOrderFilters: context.props.filters,
                workOrderFilterStatus: filterStatus
              },
              context.updatePageItems(true)
            );
          } else if (
            filterStatus[filter] === "NEW" ||
            filterStatus[filter] === "UPDATED"
          ) {
            let orderFlag = false;
            if (order === "DESC" && firstWorkOrder < secondWorkOrder) {
              orderFlag = true;
            } else if (order === "ASC" && firstWorkOrder > secondWorkOrder) {
              orderFlag = true;
            }

            if (orderFlag) {
              filteredQueue = queue.reverse();
              context.paginationInstance.itemList = filteredQueue;
              filterStatus[filter] = "APPLIED";
              context.setState(
                {
                  workOrderFilterStatus: filterStatus,
                  workOrderFilters: filters
                },
                context.updatePageItems(true)
              );
            }
          }
        } else if (filter === "Property") {
          if (!context.props.filters[filter]) {
            context.paginationInstance.itemList = context.state.workOrders;
            delete filterStatus[filter];
            if (context.state.workOrderFilters["Job Id"] === "DESC") {
              filterStatus["Job Id"] = "UPDATED";
            }
            context.setState(
              {
                workOrderFilters: context.props.filters,
                workOrderFilterStatus: filterStatus
              },
              context.updatePageItems(true)
            );
          } else if (
            filterStatus[filter] === "NEW" ||
            filterStatus[filter] === "UPDATED"
          ) {
            let street, state, zipcode, city;
            let filteredProperties = [];
            queue =
              filterStatus[filter] === "UPDATED"
                ? context.state.workOrders
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
            context.paginationInstance.itemList = filteredProperties;
            if (
              filterStatus[filter] === "UPDATED" &&
              filterStatus["Job Id"] &&
              filterStatus["Job Id"] === "DESC"
            ) {
              filterStatus["Job Id"] = "UPDATED";
            }
            filterStatus[filter] = "APPLIED";
            context.setState(
              {
                workOrderFilterStatus: filterStatus,
                filteredWorkOrders: filteredProperties,
                workOrderFilters: filters
              },
              () => {
                filterStatus["Job Id"] && filterStatus["Job Id"] === "UPDATED"
                  ? context.filterQueue()
                  : context.updatePageItems(true);
              }
            );
          }
        }
      }
    } else if (queue.length === 1) {
      for (let filter in filters) {
        if (filter === "Property" && !context.props.filters[filter]) {
          delete filters[filter];
          delete filterStatus[filter];
          context.paginationInstance.itemList = context.state.workOrders;
        }
      }
      context.setState(
        {
          workOrderFilters: filters,
          workOrderFilterStatus: filterStatus
        },
        context.updatePageItems()
      );
    } else {
      context.paginationInstance.itemList = context.state.workOrders;
      context.setState(
        {
          workOrderFilterStatus: {}
        },
        context.updatePageItems
      );
    }
  }
};
