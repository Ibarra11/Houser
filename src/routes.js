import React from 'react';

import {Switch, Route} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';

export default function(){
    return(
        <Switch>
            <Route path='/' component={LandingPage} />
        </Switch>
    )
}