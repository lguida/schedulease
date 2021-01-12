import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'
 
class Landing extends React.Component {
    render(){
        return(
            <div className='landing'>
                <h1>Welcome!</h1>
                <p>This app is intended as a tool for scheduling groups of people according to their availability and other requirements (or 'roles') that can be defined by you! You can select the available timeslots as well as any role you may need (for example 'interviewer' vs. 'candidate' or 'moderator' vs. 'participant'). To get started, click the button below! </p>
                <Link to={`/login`}><button>Login</button></Link>
                <p>or</p>
                <Link to={`/new-user`}><button>Create Account</button></Link>
            </div>
        )
    }
}

export default Landing