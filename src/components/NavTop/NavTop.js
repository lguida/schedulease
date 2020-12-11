import React from 'react'
import './NavTop.css'
import { NavLink } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'

class NavTop extends React.Component {
    static contextType = ScheduleaseContext

    getUserId = () => {
        let userId
        if (this.props.match.params.option === "schedule-settings" ||
            this.props.match.params.option === "responses" || 
            this.props.match.params.option === "completed-schedule"){
            let schedule = this.context.schedules.find(s => s.id === this.props.match.params.userId)
            userId = schedule.user_id
        }
        else{
            userId = this.props.match.params.userId
        } 
        return userId
    }

    render(){
        const userId = this.getUserId()
        return(
            <nav className='nav-top'>
                <ul className="menu">
                    <li><NavLink className='nav-button' to={`/dashboard/home/${userId}`}>Home</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/new-schedule/${userId}`}>New Schedule</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/schedule-list/${userId}`}>Schedules</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/profile/${userId}`}>Profile</NavLink></li>
                    <li><NavLink className='nav-button' to={`/login`}>Log Out</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavTop