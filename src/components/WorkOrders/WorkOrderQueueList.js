import React from "react";
import QueueItem from "./QueueItem";

const WorkOrderQueueList = ({ queueList, removeFromQueue }) => {
  return queueList.map(data => {
    return (
      <QueueItem
        removeFromQueue={removeFromQueue}
        key={data.job_id}
        data={data}
      />
    );
  });
};
export default WorkOrderQueueList;
