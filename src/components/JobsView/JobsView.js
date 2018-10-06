import React, { Component } from 'react';
import JobQueue from './JobQueue';
import AddJob from './AddJob';
import CompletedJobs from './CompletedJobs';

class JobsView extends Component {

    constructor() {
        super();
        this.state = {
            view: <AddJob />
        }
        this.renderView = this.renderView.bind(this);
    }
    renderView(view) {
        if (view === 'AddJob') {
            this.setState({ view: <AddJob /> })
        }
        else if (view === 'JobQueue') {
            this.setState({ view: <JobQueue /> })
        }
        else if (view === 'CompletedJobs'){
            this.setState({view: <CompletedJobs />})
        }
    }
    render() {
        return (
            <div className="component-jobs">
                <div className="control-panel">
                    <div className="control-panel-header">
                        <h3>Jobs</h3>
                        <h5>Control Panel</h5>
                    </div>
                    <div className="controls">
                        <div onClick={() => this.renderView('AddJob')} className="controls-link">Add Job</div>
                        <div onClick={() => this.renderView('JobQueue')} className="controls-link"> Job Queue</div>
                        <div onClick={() => this.renderView('CompletedJobs')} className="controls-link">Completed Jobs</div>
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

export default JobsView;