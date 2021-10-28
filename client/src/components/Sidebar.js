import React, {useState, useRef, useEffect} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './Sidebardata';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import onClickOutside from "react-onclickoutside";

function Sidebar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    Sidebar.handleClickOutside = () => setSidebar(false);

    const reference = useRef();

    const handleClick = e => {
        if (reference.current.contains(e.target)) {
          // inside click
          if(!sidebar) {
            showSidebar();
          }
          return;
        }
        // outside click
        if(sidebar) {
            showSidebar();
        }
      };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    return (
        <>
        <IconContext.Provider value={{size: '30px', className:"icons"}}>
            <div className ="sidebar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>

            <nav ref={reference} className={sidebar ? 'side-menu active' : 'side-menu'}>
                <ul className='side-menu-items'>
                    <li className="sidebar-toggle">
                        <Link to="#" className='menu-bars' onClick={showSidebar}>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>

                    {SidebarData.map((item,index) => {
                        return (
                            
                            <li onClick={showSidebar} key={index} className={item.cName}>
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
