import React from 'react'
import './AvailForm.css'
import ScheduleaseContext from '../../ScheduleaseContext'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
 
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
                value: 'Select role',
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
                t === e.target.value)
            this.setState({
                timeslots: newTimeslots
            })
        } 
    }
   

    validateFirstName = () => {
        if (this.state.firstName.value.trim().length === 0){
            return "Enter your first name"
        }
    }

    displayFirstNameWarning = () => {
        const message = this.validateFirstName()
        if (message && this.state.firstName.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateLastName = () => {
        if (this.state.lastName.value.trim().length === 0){
            return "Enter your last name"
        }
    }

    displayLastNameWarning = () => {
        const message = this.validateLastName()
        if (message && this.state.lastName.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateEmail = () => {
        if (this.state.email.value.trim().length === 0){
            return "Enter your email"
        }
    }

    displayEmailWarning = () => {
        const message = this.validateEmail()
        if (message && this.state.email.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateRole = () => {
        if (this.state.role.value === "Select role"){
            return "Select a role"
        }
    }

    displayRoleWarning = () => {
        const message = this.validateRole()
        if (message && this.state.role.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateTimeslots = () => {
        const emailDup = this.context.people.find(p => p.email === this.state.email.value)
        let repeatEntry = false
        if (emailDup) {
            repeatEntry = this.context.avail.some(a => 
                a.schedule_id === this.props.match.params.schedId &&
                a.user_id === emailDup.id)
        }
        if (repeatEntry){
            return "You have already submitted availablity for this schedule. If you choose to submit again, your old responses will be overridden."
        }
    }


    displayTimeslotsWarning = () => {
        const message = this.validateTimeslots()
        if (message){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    popupBeforeSubmit = (e, callback, schedId) => {
        e.preventDefault()
        if (this.state.timeslots.length === 0){
            if (window.confirm("You haven't selected any timeslots. Are you sure you want to report no availability?")){
                this.handleSubmit(e, callback, schedId)
            }
        }
        else{
            this.handleSubmit(e, callback, schedId)
        }
    }


    handleSubmit = (e, callback, schedId) => {
        e.preventDefault()
        let availList = []
        let i, personToAdd, otherAvail, thisAvail
        let previousAvail = []
        const dupPerson = this.context.people.find(p =>
            p.email === this.state.email.value)
        if (dupPerson !== undefined){
            previousAvail = this.context.avail.filter(a => 
                a.schedule_id === this.props.match.params.schedId &&
                a.user_id === dupPerson.id)
        }
        let schedule = this.context.schedules.find(s =>
            s.id === this.props.match.params.schedId)
        if (dupPerson === undefined){
            const newPersonId = uuidv4()
            personToAdd = {
                "id": newPersonId,
                "firstName": this.state.firstName.value,
                "lastName": this.state.lastName.value,
                "email": this.state.email.value,
                "timeframes": this.state.timeslots,
                "scheduleId": schedId,
                "account": false,
                "username": "",
                "password": "",
                "schedules": []
            }
            for (i=0; i < this.state.timeslots.length; i++){
                availList.push(
                {
                    "role": this.state.role.value,
                    "timeslot": this.state.timeslots[i],
                    "schedule_id": schedId,
                    "user_id": newPersonId,
                
                })
            }
            schedule["responses"] =  schedule["responses"] + 1
        }
        else {
            if (previousAvail.length !== 0){
                personToAdd = "update"
                otherAvail = this.context.avail.filter(a => 
                    a.schedule_id !== this.props.match.params.schedId)
                thisAvail = this.context.avail.filter(a => 
                    a.schedule_id === this.props.match.params.schedId)
                thisAvail = thisAvail.filter(a => a.user_id !== dupPerson.id)
                availList = [...otherAvail, ...thisAvail]
            }
            else{
                personToAdd = "none"
                schedule["responses"] =  schedule["responses"] + 1
            }
            for (i=0; i < this.state.timeslots.length; i++){
                availList.push(
                {
                    "role": this.state.role.value,
                    "timeslot": this.state.timeslots[i],
                    "schedule_Id": schedId,
                    "user_id": dupPerson.id,
                
                })
            }
            
            
        }
        
        callback(personToAdd, availList, schedule) 
        this.props.history.push(`/submitted`)
    }

    render(){
        const schedId = this.props.match.params.schedId
        const schedule = this.context.schedules.find(s =>
            s.id === schedId)
        const roles = this.context.roles.filter(role => 
            role.schedule_id = schedId)
        const timeslots = this.context.timeslots.filter(ts =>
            ts.schedule_id = schedId)
        return(
            <div className='avail-form'>
                <h1>{schedule.schedule_name}</h1>
                <form 
                    onSubmit={e => {this.popupBeforeSubmit(e, this.context.addAvail, schedId)}}>
                    <label htmlFor='participant-first-name'>First name:</label>
                    <input 
                        name='participant-first-name'
                        onChange={e => this.updateFirstName(e.target.value)}/>
                    <span className={this.displayFirstNameWarning()}>{this.validateFirstName()}</span> 
                    <br/>
                    <label htmlFor='participant-last-name'>Last name:</label>
                    <input 
                        name='participant-last-name'
                        onChange={e => this.updateLastName(e.target.value)}/>
                    <span className={this.displayLastNameWarning()}>{this.validateLastName()}</span> 
                    <br/>
                    <label htmlFor='participant-email'>Email Address:</label>
                    <input 
                        name='participant-email'
                        onChange={e => this.updateEmail(e.target.value)}/>
                    <span className={this.displayEmailWarning()}>{this.validateEmail()}</span> 
                    <br/>
                    <label htmlFor='role-select'>Role:</label>
                    <select
                        onChange={e => this.updateRole(e.target.value)}>
                            <option>Select role</option>
                        {roles.map(role =>
                            <option
                                key={role.role}>
                                {role.role}
                            </option>)}
                    </select>
                    <span className={this.displayRoleWarning()}>{this.validateRole()}</span> 
                    <br/>
                    <label htmlFor='Avail'>Select Available Timeframes</label>
                    <br/>
                    <ul>
                        {timeslots.map(ts =>
                        <li key={ts.ts_id}>
                           <input
                                type="checkbox" 
                                id={ts.ts_id} 
                                name={ts.timeslot} 
                                value={ts.ts_id}
                                onChange={e => this.updateTimeslots(e, ts.day)}/>
                           <label htmlFor={ts.timeslot}>{ts.day}: {ts.timeslot}</label>
                        </li> )}
                    </ul>
                    <span className={this.displayTimeslotsWarning()}>{this.validateTimeslots()}</span> 
                    <br />
                    <button 
                        type='submit'
                        disabled={
                            this.validateFirstName() ||
                            this.validateLastName() ||
                            this.validateEmail() ||
                            this.validateRole()}>
                        Submit Availability
                    </button>
                    <br/>
                </form>
            </div>
        )
    }
}

export default withRouter(AvailForm)

AvailForm.propTypes = {
    history: PropTypes.object.isRequired
}
