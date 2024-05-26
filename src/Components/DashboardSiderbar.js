import React from 'react'
import {NavLink} from 'react-router-dom'
import { HiVideoCamera} from "react-icons/hi";
import DashSideRow from './DashSideRow';
import '../CSS/dashsidebar.css'
import { BiImages } from "react-icons/bi";
import { MdArticle,MdDashboard } from "react-icons/md";


const DashboardSiderbar = () => {
  return (
    <div className='DashboardSiderbar' style={{
      position: 'sticky',
      top: '0',
    }}>
        {/* <NavLink to='/dashboard' className="navlink_styling"><DashSideRow Sideicon={MdDashboard} sidetitle="Dashboard"/></NavLink> */}
        <NavLink to='/dashboard-images' className="navlink_styling"><DashSideRow Sideicon={BiImages} sidetitle="Images"/></NavLink>
        <NavLink to='/dashboard-videos' className="navlink_styling"><DashSideRow Sideicon={HiVideoCamera} sidetitle="Videos"/></NavLink>
        <NavLink to='/dashboard-articles' className="navlink_styling"><DashSideRow Sideicon={MdArticle} sidetitle="Articles"/></NavLink>
       
    </div>
  )
}

export default DashboardSiderbar