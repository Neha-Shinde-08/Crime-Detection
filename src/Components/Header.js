import React from 'react'
import { NavLink } from 'react-router-dom'
import '../CSS/header.css'

const Header = () => {
  return (
    <div className='header'>
        <NavLink to='/images' className="header_navlinkStlying"  activeClassName="activeNavLink" style={{color:"violet"}}>Images</NavLink>
        <NavLink to='/videos' className="header_navlinkStlying" activeClassName="activeNavLink" >Videos</NavLink>
        {/* <NavLink to='/articles' className="header_navlinkStlying" activeClassName="activeNavLink" >Articles</NavLink> */}
        {/* <NavLink to='/dashboard' className="header_navlinkStlying" activeClassName="activeNavLink" >Dashboard</NavLink> */}
    </div>
  )
}

export default Header;