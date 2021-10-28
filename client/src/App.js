import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import TripHistory from './pages/triphistory';
import Reports from './pages/gasefficiencyreports';
import UserProfile from './pages/userprofile';
import NewTrip from './pages/newtrip';
import MyMap from './pages/maps';


function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path = '/' exact component={Home}/>
        <Route path = '/triphistory' component={TripHistory}/>
        <Route path = '/gasefficiencyreports' component={Reports}/>
        <Route path = '/userprofile' component={UserProfile}/>
        <Route path = '/newtrip' component={NewTrip}/>
        <Route path = '/maps' component ={MyMap}/>
      </Switch>
    </Router>
  );
}

export default App;
