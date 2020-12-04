import React from 'react'
import './Responses.css'
import ScheduleaseContext from '../../ScheduleaseContext'

class Responses extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const availEntries = this.context.avail.filter(resp =>
            parseInt(resp.scheduleId) === parseInt(this.props.match.params.schedId))
        //const responses 
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
                    
                </table>
            </div>
        )
    }
}

export default Responses

/* <tbody>
                        {responses.map(resp =>
                        <tr key={resp.id}>
                            <td>{resp.firstName} {resp.lastName}</td>
                            <td>{resp.email}</td>
                            <td>{resp.role}</td>
                        </tr>
                        )}
                    </tbody> */