import React from "react";
import QueueItem from "./QueueItem";

const WorkOrderQueueList = ({
  queueList,
  removeFromQueue,
  addToCompletedWorkOrders
}) => {
  return queueList.map(data => {
    return (
      <QueueItem
        removeFromQueue={removeFromQueue}
        addToCompletedWorkOrders={addToCompletedWorkOrders}
        key={data.job_id}
        data={data}
      />
    );
  });
};
export default WorkOrderQueueList;
