import React from 'react'
import './Responses.css'
import { Link } from 'react-router-dom'
import ScheduleaseContext from '../../ScheduleaseContext'

class Responses extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const schedId = this.props.match.params.schedId
        const avail = this.context.avail.filter(s =>
            s.schedule_id === parseInt(schedId))
        const peopleIds = avail.map(entry =>
            entry.people_id)
        const people = this.context.people.filter(user =>
            peopleIds.some(id => id === user.id) === true)
        let listEntries = [] 
        let x
        people.flatMap(person => {
            x = avail.find(avail => avail.people_id === person.id)
            listEntries.push({
                "first_name": person.first_name,
                "last_name": person.last_name,
                "email": person.email,
                "role_name": x.role_name 
            })
        })
        if (people.length === 0) {
            return (
                <div className='responses'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                </table>
                <br/>
                <span>No responses yet</span>
                <p><Link className='indiv-schedule-link' to={`/avail-form/${schedId}`}>Share Availability Form</Link></p>
            </div>
            )
        }
        else{
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
                            {listEntries.map(resp =>
                            <tr key={resp.id}>
                                <td>{resp.first_name} {resp.last_name}</td>
                                <td>{resp.email}</td>
                                <td>{resp.role_name}</td>
                            </tr>
                            )}
                        </tbody> 
                    </table>
                </div>
            )
        }
    }
}

export default Responses
