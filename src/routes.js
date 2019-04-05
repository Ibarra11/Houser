import React from "react";

import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import WorkOrderViews from "./components/WorkOrders/WorkOrderViews";
import PropertiesView from "./components/PropertyView/PropertyView";
import Transactions from "./components/Transactions/Transactions";
import Payment from "./components/Payment/Payment";

export function baseRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/payment" component={Payment} />
      <Route path="/houser" component={Navbar} />
    </Switch>
  );
}

export function mainRoutes() {
  return (
    <Switch>
      <Route exact path="/houser/work-orders" component={WorkOrderViews} />
      <Route exact path="/houser/Transactions" component={Transactions} />
      <Route path="/houser" component={PropertiesView} />
    </Switch>
  );
}
