import React from 'react'
import './CompleteSharing.css'
import ScheduleaseContext from '../../ScheduleaseContext'

class CompleteSharing extends React.Component {
    static contextType = ScheduleaseContext

    getTimeslots = () => {
        let tsIds = []
        let schedule = this.context.complete.filter(entry => 
            entry.schedule_id === this.props.match.params.schedId)
        schedule.forEach(entry =>{
            tsIds.push(entry.ts_id)
        })
        let timeslots = this.context.timeslots.filter(entry =>
            tsIds.some(x => entry.ts_id === x) === true)
        schedule.map(entry => entry.ts_id = timeslots.find(ts => entry.ts_id === ts.ts_id))
        return schedule
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
                            <td>{entry.ts_id.day}</td>
                            <td>{entry.ts_id.timeslot}</td>
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