import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import TripHisotry from './pages/triphistory';
import Reports from './pages/gasefficiencyreports';
import UserProfile from './pages/userprofile';


function App() {
  return (
    <>
    <Router>
      <Sidebar />
      <Switch>
        <Route path = '/' exact component={Home}/>
        <Route path = '/triphistory' component={TripHisotry}/>
        <Route path = '/gasefficiencyreports' component={Reports}/>
        <Route path = '/userprofile' component={UserProfile}/>
      </Switch>
    </Router>
    
    </>
  );
}

export default App;
