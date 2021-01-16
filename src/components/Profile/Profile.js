import React from 'react'
import './Profile.css'
import ScheduleaseContext from '../../ScheduleaseContext'
 
class Profile extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const userId = parseInt(this.props.match.params.userId)
        const user = this.context.people.find(per =>
            per.id === userId)
        return(
            <div className='profile'>
                <h1>Hi {user.first_name}!</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{user.first_name} {user.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        )
    }
}

export default Profile

//<li>Password: <button>Change Password</button></li>