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
                    <h2>{schedule.schedule_name} </h2>

                    <p><Link className='indiv-schedule-link' to={`/avail-form/${schedId}`}>Share Availability Form</Link></p>
                
                    <span>Meeting duration: {schedule.meeting_duration}</span>
                    <br/>
                    <div className='group'>
                        <div className='sched-set-roles-list'> 
                            <label>Roles:</label>
                            <ul>
                                {roles.map(r =>
                                    <li key={r.id}>{r.role_name}</li>)}
                            </ul>
                        </div>
                        <br/>
                        <div className='sched-set-ts-list'>
                            <label>Timeslots:</label>
                            <br/>
                            <ul>
                                {timeslots.map(slot =>
                                    <li key={uuidv4()}>{slot.day_name}: {slot.timeslot}</li>)}
                            </ul>
                        </div>
                    </div>
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

