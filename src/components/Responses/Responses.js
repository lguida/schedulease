import React from 'react'
import './Responses.css'
import ScheduleaseContext from '../../ScheduleaseContext'

class Responses extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const schedId = this.props.match.params.schedId
        const avail = this.context.avail.filter(s =>
            s.schedule_id === schedId)
        const peopleIds = avail.map(entry =>
            entry.user_id)
        const people = this.context.people.filter(user =>
            peopleIds.some(id => id === user.id) === true)
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
                        {people.map(resp =>
                        <tr key={resp.id}>
                            <td>{resp.firstName} {resp.lastName}</td>
                            <td>{resp.email}</td>
                            
                        </tr>
                        )}
                    </tbody> 
                </table>
            </div>
        )
    }
}

export default Responses

// add this back in <td>{resp.role}</td>