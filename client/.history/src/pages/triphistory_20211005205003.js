import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import Reports from './pages/gasefficiencyreports';
import UserProfile from './pages/userprofile';

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