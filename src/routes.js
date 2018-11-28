import React from 'react';

import { Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import WorkOrders from './components/WorkOrders/WorkOrders';
import PropertiesView from './components/PropertyView/PropertyView';
import Transactions from './components/Transactions/Transactions';
import Payment from './components/Payment/Payment';

export function baseRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/payment' component={Payment} />
            <Route path='/houser' component={Home} />
        </Switch>
    )
}


export function mainRoutes() {
    return (
        <Switch>
            <Route path='/houser/work-orders' component={WorkOrders} />
            <Route path='/houser/properties' component={PropertiesView} />
            <Route path='/houser/Transactions' component={Transactions} />
        </Switch>
    )

}