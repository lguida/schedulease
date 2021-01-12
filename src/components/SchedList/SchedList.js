import React from 'react'
import './SchedList.css'
import { Link } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'

class SchedList extends React.Component {
    static contextType = ScheduleaseContext


    render(){
        const userSchedules = this.context.schedules.filter(s => 
            s.people_id === parseInt(this.props.match.params.userId))
        return(
            <div className='schedule-list'>
                <table>
                    <thead>
                        <tr>
                            <th>ScheduleName</th>
                            <th>Status</th>
                            <th>Responses</th>
                            <th>Meeting Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userSchedules.map(sched =>
                            <tr key={sched.id}>
                                <td><Link 
                                    className='indiv-schedule-link' 
                                    to={`/schedule/schedule-settings/${sched.id}`}>
                                    {sched.schedule_name}</Link></td>
                                <td>{sched.status}</td>
                                <td>{sched.responses}</td>
                                <td>{sched.meeting_duration}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SchedList