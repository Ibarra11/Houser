import React from 'react';

import { Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';

export default function () {
    return (
        <Switch>
            <Route path='/home' component={Home} />
            <Route path='/' component={LandingPage} />
        </Switch>
    )
}