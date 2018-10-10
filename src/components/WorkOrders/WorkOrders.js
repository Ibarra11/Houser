import React, { Component } from 'react';
import WorkOrderQueue from './WorkOrderQueue';
import CreateWorkOrder from './CreateWorkOrder';
import CompletedWorkOrders from './CompletedWorkOrders';

class WorkOrders extends Component {
    constructor() {
        super();
        this.state = {
            view: <CreateWorkOrder />
        }
        this.renderView = this.renderView.bind(this);
    }
    renderView(view) {
        if (view === 'CreateWorkOrder') {
            this.setState({ view: <CreateWorkOrder /> })
        }
        else if (view === 'WorkOrderQueue') {
            this.setState({ view: <WorkOrderQueue /> })
        }
        else if (view === 'CompletedWorkOrders'){
            this.setState({view: <CompletedWorkOrders />})
        }
    }
    render() {
        return (
            <div className="component-jobs">
                <div className="control-panel">
                    <div className="control-panel-header">
                        <h3>Work Orders</h3>
                        <h5>Control Panel</h5>
                    </div>
                    <div className="controls">
                        <div onClick={() => this.renderView('CreateWorkOrder')} className="controls-link">Create Work Order</div>
                        <div onClick={() => this.renderView('WorkOrderQueue')} className="controls-link"> Work Order Queue</div>
                        <div onClick={() => this.renderView('CompletedWorkOrders')} className="controls-link">Completed Work Orders</div>
                        <div onClick={() => this.renderView('AddJob')} className="controls-link">Analytics</div>
                    </div>
                </div>
                <div className="jobs-view">
                    {this.state.view}
                </div>
            </div>
        )
    }
}

export default WorkOrders;