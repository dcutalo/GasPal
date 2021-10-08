import React from 'react';
import { Router } from 'react-router';
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Sidebar />
      <Switch>
        <Route path = '/' />
      </Switch>
    </Router>
    
    </>
  );
}

export default App;
