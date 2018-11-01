import React from 'react';
import WorkOrder from './WorkOrder';
const WorkOrderList = function({workOrders, editWorkOrder}){
    return(
        <div className="work-order-list">
            {workOrders.map((workOrder,index) =>{
                return(
                    <WorkOrder index={index} editWorkOrder={editWorkOrder} key={workOrder.job_id}  data={workOrder} />
                )
            })}
        </div>
    )
}

export default WorkOrderList;