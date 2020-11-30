import React from 'react'
import './SchedSet.css'
import { Link } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'

class SchedSet extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const schedId = parseInt(this.props.match.params.schedId)
        const schedule = this.context.schedules.find(s =>
            s.id === schedId)
        return(
            <div className='schedule-settings'>
                <span htmlFor='sched-name'>Schedule name: {schedule.schedule_name}</span>
                <br/>
                <span htmlFor='roles-input'>Roles:</span>
                <ul>
                    {schedule.roles.map(role =>
                        <li key={role}>{role}</li>)}
                </ul>
                <br/>
                <span htmlFor='meeting-duration'>Meeting duration: {schedule.meeting_duration}</span>
                <br/>
                <label htmlFor='Avail'>Timeslots:</label>
                <br/>
                <ul>
                    {schedule.timeslots.map(slot =>
                        <li key={slot}>{slot}</li>)}
                </ul>
                <button>Edit Schedule Settings</button>
                <Link className='indiv-schedule-link' to={`/complete-schedule/${schedId}`}><button>Share Complete Schedule</button></Link>
                <p><Link className='indiv-schedule-link' to={`/avail-form/${schedId}`}>Share Availability Form</Link></p>
            </div>
        )
    }
}

export default SchedSet