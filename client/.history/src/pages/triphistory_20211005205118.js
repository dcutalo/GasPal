import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './home';
import Reports from './gasefficiencyreports';
import UserProfile from './userprofile';

function TripHistory() {
    return (
        <Router>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </Router>
    )
}

export default TripHistory