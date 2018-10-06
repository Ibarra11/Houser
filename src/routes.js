import React from 'react';

import { Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import JobsView from './components/JobsView/JobsView';
import PropertiesView from './components/PropertyView/PropertyView'; 
import Transactions from './components/Transactions/Transactions'; 


export function baseRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/houser' component={Home} />
        </Switch>
    )
}


export function mainRoutes() {
    return (
        <Switch>
            <Route path='/houser/jobs' component={JobsView} />
            <Route path='/houser/properties' component={PropertiesView} />
            <Route path='/houser/transactions' component={Transactions} />
        </Switch>
    )

}