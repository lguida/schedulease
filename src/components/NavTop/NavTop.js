import React from 'react'
import './NavTop.css'
import { NavLink } from 'react-router-dom'

class NavTop extends React.Component {
    render(){
        return(
            <nav className='nav-top'>
                <ul className="menu">
                    <li><NavLink className='nav-button' to={`/dashboard/home`}>Home</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/new-schedule`}>New Schedule</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/schedule-list`}>Schedules</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/profile`}>Profile</NavLink></li>
                    <li><NavLink className='nav-button' to={`/login`}>Log Out</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavTop