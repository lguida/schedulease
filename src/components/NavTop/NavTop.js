import React from 'react'
import './NavTop.css'
import { NavLink } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'
import authenticationService from '../../Auth/auth-service'

class NavTop extends React.Component {
    static contextType = ScheduleaseContext

    getUserId = () => {
        let userId
        if (this.props.match.params.option === "schedule-settings" ||
            this.props.match.params.option === "responses" || 
            this.props.match.params.option === "completed-schedule"){
            let schedule = this.context.schedules.find(s => s.id === this.props.match.params.userId)
            userId = schedule.people_id
        }
        else{
            userId = this.props.match.params.userId
        } 
        return userId
    }
    
    logout = () => {
        authenticationService.logout();
        this.props.history.push('/login')
    }
    

    render(){
        const userId = parseInt(this.props.match.params.userId)
        return(
            <nav className='nav-top'>
                <ul className="menu">
                    <li><NavLink className='nav-button' to={`/dashboard/home/${userId}`}>Home</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/new-schedule/${userId}`}>New Schedule</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/schedule-list/${userId}`}>Schedules</NavLink></li>
                    <li><NavLink className='nav-button' to={`/dashboard/profile/${userId}`}>Profile</NavLink></li>
                    <li><button className='nav-button' onClick={e => this.logout(e)}>Log Out</button></li>
                </ul>
            </nav>
        )
    }
}

export default NavTop