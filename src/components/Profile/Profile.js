import React from 'react'
import './Profile.css'
 
class Profile extends React.Component {
    render(){
        return(
            <div className='profile'>
                <h1>Hi Sherlock!</h1>
                <ul>
                    <li>Name: Serlock homes</li>
                    <li>Email: shomles@gmail.com</li>
                    <li>Password: <button>Change Password</button></li>
                </ul>
            </div>
        )
    }
}

export default Profile