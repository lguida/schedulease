import React from 'react'
import './Responses.css'
import ScheduleaseContext from '../../ScheduleaseContext'

class Responses extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const responses = this.context.availResponses.filter(resp =>
            parseInt(resp.scheduleId) === parseInt(this.props.match.params.schedId))
        return(
            <div className='responses'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map(resp =>
                        <tr key={resp.id}>
                            <td>{resp.firstName} {resp.lastName}</td>
                            <td>{resp.email}</td>
                            <td>{resp.role}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Responses