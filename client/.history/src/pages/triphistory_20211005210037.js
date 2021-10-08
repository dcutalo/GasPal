import React from 'react';
import { SidebarData } from '../Sidebardata';

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