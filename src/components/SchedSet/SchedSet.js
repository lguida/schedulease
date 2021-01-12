import React from 'react'
import './SchedSet.css'
import { Link } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'
import { v4 as uuidv4 } from 'uuid'

class SchedSet extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const schedId = this.props.match.params.schedId
        let schedule, roles, timeslots
        if(this.context.schedules){
            schedule = this.context.schedules.find(s =>
            s.id === parseInt(schedId))
        }
        if(this.context.timeslots){ 
            timeslots = this.context.timeslots.filter(ts =>
                ts.schedule_id === parseInt(schedId))
        }
        if (this.context.roles){
            roles = this.context.roles.filter(role => 
                role.schedule_id === parseInt(schedId))
        }
        
        if (roles && schedule && timeslots){
            return(
                <div className='schedule-settings'>
                    <span>Schedule name: {schedule.schedule_name} </span>
                <br/>
                <span>Roles:</span>
                <ul>
                    {roles.map(r =>
                        <li key={r.id}>{r.role_name}</li>)}
                </ul>
                <br/>
                <span>Meeting duration: {schedule.meeting_duration}</span>
                <br/>
                <label>Timeslots:</label>
                <br/>
                <ul>
                    {timeslots.map(slot =>
                        <li key={uuidv4()}>{slot.day_name}: {slot.timeslot}</li>)}
                </ul>
                <p><Link className='indiv-schedule-link' to={`/avail-form/${schedId}`}>Share Availability Form</Link></p>
                </div>
            )
        }
        else{
            return(
                <div className='schedule-settings'>
                    <h1>Loading...</h1>
                </div>
            )
        }
    
    }
}

export default SchedSet

