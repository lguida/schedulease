import React from 'react'
import './SchedSet.css'
import { Link } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'
import { v4 as uuidv4 } from 'uuid'

class SchedSet extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const schedId = this.props.match.params.schedId
        const schedule = this.context.schedules.find(s =>
            s.id === schedId)
        const roles = this.context.roles.filter(role => 
            role.schedule_id = schedId)
        const timeslots = this.context.timeslots.filter(ts =>
            ts.schedule_id = schedId)
        return(
            <div className='schedule-settings'>
                <span htmlFor='sched-name'>Schedule name: {schedule.schedule_name} </span>
            <br/>
            <span htmlFor='roles-input'>Roles:</span>
            <ul>
                {roles.map(r =>
                    <li key={r.role}>{r.role}</li>)}
            </ul>
            <br/>
            <span htmlFor='meeting-duration'>Meeting duration: {schedule.meeting_duration}</span>
            <br/>
            <label htmlFor='Avail'>Timeslots:</label>
            <br/>
            <ul>
                {timeslots.map(slot =>
                    <li key={uuidv4()}>{slot.day}: {slot.timeslot}</li>)}
            </ul>
            <Link className='indiv-schedule-link' to={`/complete-schedule/${schedId}`}><button>Share Complete Schedule</button></Link>
            <p><Link className='indiv-schedule-link' to={`/avail-form/${schedId}`}>Share Availability Form</Link></p>
            </div>
        )
    }
}

export default SchedSet

//implement an Edit schedule button
