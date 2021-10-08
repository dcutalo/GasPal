import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";

export const Sidebardata = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'side-text'
    },
    {
        title: 'Gas Efficiency Reports',
        path: '/gasefficiencyreports',
        icon: <MdIcons.MdHistoryEdu />,
        cName: 'side-text'
    },
    {
        title: 'Trip History',
        path: '/triphistory',
        icon: <AiIcons.AiOutlineHistory />,
        cName: 'side-text'
    },
    {
        title: 'User Profile',
        path: '/userprofile',
        icon: <CgIcons.CgProfile />,
        cName: 'side-text'
    }
]