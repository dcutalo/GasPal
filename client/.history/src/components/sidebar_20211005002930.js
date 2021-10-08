import React from 'react'
import * as Icons from "react-icons/fa";
import { Link } from 'react-router-dom';

function sidebar() {
    return (
        <>
            <div className ="sidebar">
                <Link to="#" className='menu-bars'>
                    <Icons.FaBars/>
                </Link>
            </div>
        </>
    )
}

export default sidebar
