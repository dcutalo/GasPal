import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './home';
import Reports from './gasefficiencyreports';
import UserProfile from './userprofile';

function TripHistory() {
    return (
        <Router>
            <Switch>
            <Route path = '/' exact component={Home}/>
            <Route path = '/gasefficiencyreports' component={Reports}/>
            <Route path = '/userprofile' component={UserProfile}/>
            </Switch>
        </Router>
    )
}

export default TripHistory