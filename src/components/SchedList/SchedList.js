import React from 'react'
import './SchedList.css'
import { Link } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'

class SchedList extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        return(
            <div className='schedule-list'>
                <table>
                    <thead>
                        <tr>
                            <th>ScheduleName</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th>Responses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.context.schedules.map(sched =>
                            <tr key={sched.id}>
                                <td>{sched.schedule_name}</td>
                                <td>{sched.status}</td>
                                <td>{sched.deadline}</td>
                                <td>filler</td>
                                <td><Link 
                                    className='indiv-schedule-link' 
                                    to={`/dashboard/schedule-settings/${sched.id}`}>
                                    View</Link>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SchedList