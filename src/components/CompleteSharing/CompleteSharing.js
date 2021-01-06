import React from 'react'
import './CompleteSharing.css'
import ScheduleaseContext from '../../ScheduleaseContext'

class CompleteSharing extends React.Component {
    static contextType = ScheduleaseContext

    
    getTimeslots = () => {
        let finalized = []
        let tsObj
        let schedule = this.context.complete.filter(entry => 
            entry.schedule_id === parseInt(this.props.match.params.schedId))
        schedule.forEach(entry => {
            tsObj = this.context.timeslots.find(ts => ts.id === entry.timeslot)
            finalized.push(
                {
                    "name": entry.people_name,
                    "role": entry.role_name,
                    "day": tsObj.day_name,
                    "time": tsObj.timeslot
                }
            )
        })
        return finalized
    }


    render(){
        const sharingSched = this.getTimeslots()
        console.log(sharingSched)
        return(
            <div className='complete-schedule'>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sharingSched.map(entry =>
                        <tr>
                            <td>{entry.day}</td>
                            <td>{entry.time}</td>
                            <td>{entry.name}</td>
                            <td>{entry.role}</td>
                        </tr> )}

                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default CompleteSharing