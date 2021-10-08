import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './Sidebardata';
import './Sidebar.css';
import { IconContext } from 'react-icons'

function Sidebar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
        <IconContext.Provider value={{color: '#fff', size: '30px'}}>
            <div className ="sidebar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>

            <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                <ul className='side-menu-items'>
                    <li className="sidebar-toggle">
                        <Link to="#" className='menu-bars' onClick={showSidebar}>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item,index) => {
                        return (
                            
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                            
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Sidebar