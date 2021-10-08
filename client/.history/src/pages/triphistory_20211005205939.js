import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './home';
import Reports from './gasefficiencyreports';
import UserProfile from './userprofile';

function TripHistory() {
    return (
        SidebarData.map((item,index) => {
            return (
                
                <li key={index} className={item.cName}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                </li>
                
            );
        }  
    )) 
}

export default TripHistory