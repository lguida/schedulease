import React from 'react'
import './AvailForm.css'
import ScheduleaseContext from '../../ScheduleaseContext'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
 
class AvailForm extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            firstName: {
                value: '',
                touched: false },
            lastName: {
                value: '',
                touched: false },
            email: {
                value: '',
                touched: false },
            role: {
                value: '',
                touched: false},
            timeslots: []
        }
    }

    updateFirstName = (name) => {
        this.setState({ firstName: { value: name, touched: true} })
    }

    updateLastName = (name) => {
        this.setState({ lastName: { value: name, touched: true} })
    }

    updateEmail = (email) => {
        this.setState({ email: { value: email, touched: true} })
    }

    updateRole = (role) => {
        this.setState({ role: { value: role, touched: true} })
    }

    updateTimeslots = (e) => {
        if (e.target.checked){
            this.setState ({
                timeslots: [...this.state.timeslots, e.target.value]
            })
        }
        else{
            let newTimeslots = this.state.timeslots.filter(t =>
                t !== e.target.value)
            this.setState({
                timeslots: newTimeslots,
            })
        } 
    }
   

    validateAvailSubmission = () => {
        if (this.state.firstName.touched === true && 
            this.state.firstName.value.trim().length === 0){
            return "Enter your first name"
        }
        else if (this.state.lastName.touched === true && 
            this.state.lastName.value.trim().length === 0){
                return "Enter your last name"
        }
        else if (this.state.email.touched === true && 
            this.state.email.value.trim().length === 0){
                return "Enter your email"
        }
        else if (this.state.role.touched === true && 
            this.state.role.value === "Select role"){
                return "Please select a role"
        }
        else if (this.state.role.touched === true && 
            this.state.role.value === "Select role"){
                return "Please select a role"
        }
    }

    

    displayValidationMessage = () => {
        return this.validateAvailSubmission()
    }

    displayWarnings = schedId => {
        let message = []
        const availsForThisSchedule = this.context.availResponses.filter(resp =>
            resp.scheduleId === schedId)
        const dup = availsForThisSchedule.filter(resp =>
            resp.email.toUpperCase() === this.state.email.value.toUpperCase())
        if (this.state.timeslots.length === 0){
            message = ["You haven't selected any timeslots. Are you sure you want to report no availability?"]
        }
        if (dup.length !== 0){
            message = [...message, "An availability form with that email has already been submitted. Be advised that your current submission will override your previous one."]
        }
        return message
        
    }

    handleSubmit = (e, callback, schedId) => {
        e.preventDefault()
        let availList = []
        let i
        for (i=0; i < this.state.timeslots.length; i++){
            availList.push(
            {
                "role": this.state.role,
                "timeslot": this.state.timeslots[i],
                "scheduleId": schedId,
                "personId": this.state.email,
            
            })
        }
        const personToAdd = {
            "id": 6, //need to add id system
            "firstName": this.state.firstName.value,
            "lastName": this.state.lastName.value,
            "email": this.state.email.value,
            "role": this.state.role.value,
            "timeframes": this.state.timeslots,
            "scheduleId": schedId
        }
        callback(personToAdd, availList) 
        this.props.history.push(`/dashboard/responses/${schedId}`)
    }

    render(){
        const schedId = parseInt(this.props.match.params.schedId)
        const schedule = this.context.schedules.find(s =>
            s.id === schedId)
        return(
            <div className='avail-form'>
                <h1>{schedule.schedule_name}</h1>
                <h2>Submission Deadline: {schedule.deadline}</h2>
                <form 
                    onSubmit={e => {this.handleSubmit(e, this.context.addAvail, schedId)}}>
                    <label htmlFor='participant-first-name'>First name:</label>
                    <input 
                        name='participant-first-name'
                        onChange={e => this.updateFirstName(e.target.value)}/>
                    <br/>
                    <label htmlFor='participant-last-name'>Last name:</label>
                    <input 
                        name='participant-last-name'
                        onChange={e => this.updateLastName(e.target.value)}/>
                    <br/>
                    <label htmlFor='participant-email'>Email Address:</label>
                    <input 
                        name='participant-email'
                        onChange={e => this.updateEmail(e.target.value)}/>
                    <br/>
                    <label htmlFor='role-select'>Role:</label>
                    <select
                        onChange={e => this.updateRole(e.target.value)}>
                            <option>Select role</option>
                        {schedule.roles.map(role =>
                            <option
                                key={role}>
                                {role}
                            </option>)}
                    </select>
                    <br/>
                    <label htmlFor='Avail'>Select Available Timeframes</label>
                    <br/>
                    <ul>
                        {schedule.timeslots.map(ts =>
                        <li key={ts}>
                           <input
                                type="checkbox" 
                                id={ts} 
                                name={ts} 
                                value={ts}
                                onChange={e => this.updateTimeslots(e)}/>
                           <label htmlFor={ts}>{ts}</label>
                        </li> )}
                    </ul>
                    <button 
                        type='submit'
                        disabled={this.validateAvailSubmission()}>
                        Submit Availability
                    </button>
                    <br/>
                    <span className="warning">{this.displayValidationMessage()}</span>
                    <span className="warning">{this.displayWarnings(schedId)}</span>
                </form>
            </div>
        )
    }
}

export default withRouter(AvailForm)

AvailForm.propTypes = {
    history: PropTypes.object.isRequired
}

//TODO: figure out how to make the warnings appear
//also, make sure that duplicate email addresses DO override the old submission
//make a page to direct to that says their submission was successfully recorded