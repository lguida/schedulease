import React from 'react'
import './NavLeft.css'
import { NavLink } from 'react-router-dom'

class NavLeft extends React.Component {
    render(){
        const schedId = this.props.match.params.schedId
        return(
        <div className='nav-left'>
            <ul className='actions'>
                <li><NavLink className='action-button' to={`/dashboard/schedule-settings/${schedId}`}>Schedule settings</NavLink></li>
                <li><NavLink className='action-button' to={`/dashboard/responses/${schedId}`}>Responses</NavLink></li>
                <li><NavLink className='action-button' to={`/dashboard/completed-schedule/${schedId}`}>Completed Schedule</NavLink></li>
            </ul>
        </div>
        )
    }
}

export default NavLeft