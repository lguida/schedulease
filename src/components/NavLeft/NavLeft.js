import React from 'react'
import './NavLeft.css'
import { NavLink } from 'react-router-dom'

class NavLeft extends React.Component {
    render(){
        const schedId = this.props.match.params.schedId
        return(
        <div className='nav-left'>
            <ul className='actions'>
                <li><NavLink className='action-button switch-left' to={`/schedule/schedule-settings/${schedId}`}>Schedule Settings</NavLink></li>
                <li><NavLink className='action-button one-line-left' to={`/schedule/responses/${schedId}`}>Responses</NavLink></li>
                <li><NavLink className='action-button' to={`/schedule/completed-schedule/${schedId}`}>Completed Schedule</NavLink></li>
            </ul>
        </div>
        )
    }
}

export default NavLeft