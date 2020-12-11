import React from 'react'
import './Profile.css'
import ScheduleaseContext from '../../ScheduleaseContext'
 
class Profile extends React.Component {
    static contextType = ScheduleaseContext
    render(){
        const user = this.context.people.find(p => p.id === this.props.match.params.userId)
        return(
            <div className='profile'>
                <h1>Hi {user.firstName}!</h1>
                <ul>
                    <li>Name: {user.firstName} {user.lastName}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: <button>Change Password</button></li>
                </ul>
            </div>
        )
    }
}

export default Profile