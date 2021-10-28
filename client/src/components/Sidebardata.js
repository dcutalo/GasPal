import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'side-text'
    },
    {
        title: 'Gas Efficiency Reports',
        path: '/gasefficiencyreports',
        icon: <HiIcons.HiDocumentReport />,
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
    },
    {
        title: 'New Trip',
        path: '/newtrip',
        icon: <BiIcons.BiTrip />,
        title: 'Map',
        path: '/maps',
        icon: <AiIcons.AiFillCar />,
        cName: 'side-text'
    }
]