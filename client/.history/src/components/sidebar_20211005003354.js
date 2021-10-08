import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/fa";
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <div className ="sidebar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars/>
                </Link>
            </div>
            <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                <ul className='side-menu-items'>
                    <li className="sidebar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar
