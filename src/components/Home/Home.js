import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
 
class Home extends React.Component {
    render(){
        return(
            <div className='home'>
                <h1>Welcome!</h1>
                <p className='home-description'>This app is intended as a tool for scheduling groups of people according to their availability and other requirements (or 'roles') that can be defined by you! You can select the available timeslots as well as any role you may need (for example 'interviewer' vs. 'candidate' or 'moderator' vs. 'participant'). To get started, click the button below! </p>
                <Link to={`/dashboard/new-schedule/${parseInt(this.props.match.params.userId)}`}><button>Try it!</button></Link>
            </div>
        )
    }
}


export default Home