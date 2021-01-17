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
            let schedule = this.context.schedules.find(s => s.id === parseInt(this.props.match.params.schedId))
            if (schedule !== undefined){
                userId = schedule.people_id
            }
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
        const userId = this.getUserId()
        return(
            <div className='banner-top'>
                <h1>Schedulease</h1>
                <hr/>
                <nav className='nav-top'>
                    
                    <ul className="menu">
                        <li><NavLink className='nav-button one-line' to={`/dashboard/home/${userId}`}>Home</NavLink></li>
                        <li><NavLink className='nav-button two-line' to={`/dashboard/new-schedule/${userId}`}>New Schedule</NavLink></li>
                        <li><NavLink className='nav-button one-line' to={`/dashboard/schedule-list/${userId}`}>Schedules</NavLink></li>
                        <li><NavLink className='nav-button one-line' to={`/dashboard/profile/${userId}`}>Profile</NavLink></li>
                        <li><button className='nav-button' onClick={e => this.logout(e)}>Log Out</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavTop