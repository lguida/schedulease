import React from 'react'
import './CompleteSharing.css'
import ScheduleaseContext from '../../ScheduleaseContext'



class CompleteSharing extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        return(
            <div className='complete-schedule'>
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>9am</td>
                            <td>Sherlock Holmes</td>
                            <td>shomles@gmail.com</td>
                            <td>Manager</td>
                        </tr>
                    </tbody>
                </table>   
            </div>
        )
    }
}

export default CompleteSharing