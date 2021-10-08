import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'side-text'
    },
    {
        title: 'Gas EFFCY Reports',
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
    }
]