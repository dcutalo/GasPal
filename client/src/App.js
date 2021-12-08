import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import TripHistory from './pages/triphistory';
import Reports from './pages/gasefficiencyreports';
import UserProfile from './pages/userprofile';
import NewTrip from './pages/newtrip';
import Login from './pages/login';
import {withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history'
import Maps from './pages/freshMaps'

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);


function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <ProtectedRoute path = '/' exact component={Home}/>
        <Route path = '/login' component={Login}/>
        <Route exact path="/map" render={() => {window.location.href="map.html"}} />
        <ProtectedRoute path = '/triphistory' component={TripHistory}/>
        <ProtectedRoute path = '/gasefficiencyreports' component={Reports}/>
        <ProtectedRoute path = '/userprofile' component={UserProfile}/>
        <ProtectedRoute path = '/newtrip' component={NewTrip}/>
        
      </Switch>
    </Router>
  );
}

export default App;
