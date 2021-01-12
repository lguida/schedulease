import React from 'react'
import './AvailForm.css'
import ScheduleaseContext from '../../ScheduleaseContext'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import config from '../../config'
 
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
                a.schedule_id === parseInt(this.props.match.params.schedId) &&
                a.people_id === emailDup.id)
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

    popupBeforeSubmit = (e, cbAddAvail, cbAddPerson, cbEditSchedule, cbRemoveAvail, schedId) => {
        e.preventDefault()
        if (this.state.timeslots.length === 0){
            if (window.confirm("You haven't selected any timeslots. Are you sure you want to report no availability?")){
                this.handleSubmit(e, cbAddAvail, cbAddPerson, cbEditSchedule, cbRemoveAvail, schedId)
            }
        }
        else{
            this.handleSubmit(e, cbAddAvail, cbAddPerson, cbEditSchedule, cbRemoveAvail, schedId)
        }
    }

    addPersonAndAvail = (schedule, cbAddPerson, cbAddAvail, cbEditSchedule, availList, schedId) => {
        //create the person to add
        let i
        const personToAdd = {
            "first_name": this.state.firstName.value,
            "last_name": this.state.lastName.value,
            "email": this.state.email.value,
            "account": false,
            "username": null,
            "password": null
        }
        //add the person to the *people* database

        fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            body: JSON.stringify(personToAdd),
            headers: {
              'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok){
              throw new Error(res.status)
            }
            return res.json()
        })
        .then(data =>{
            const sendingNewPerson = {
                "id": data.id,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "email": data.email,
                "account": data.account,
                "username": data.username,
                "password": data.password
            }
            cbAddPerson(sendingNewPerson) 
        
            //create the avail to add
            for (i=0; i < this.state.timeslots.length; i++){
                availList.push(
                {
                    "role_name": this.state.role.value,
                    "timeslot": parseInt(this.state.timeslots[i]),
                    "schedule_id": parseInt(schedId),
                    "people_id": data.id,
                })
            }
            //add the person's avails to the *avail* database
            fetch(`${config.API_ENDPOINT}/avail`, {
                method: 'POST',
                body: JSON.stringify(availList),
                headers: {
                'content-type': 'application/json',
                }
            })
            .then(res => {
                if (!res.ok){
                throw new Error(res.status)
                }
                return res.json()
            })
            .then(item =>{
                let addAvailToList = []
                item.map(item => {
                    addAvailToList.push({
                        "id": item.id,
                        "role_name": item.role_name,
                        "timeslot": item.timeslot,
                        "schedule_id": item.schedule_id,
                        "people_id": item.people_id,
                    })
                })
                cbAddAvail(addAvailToList) 
            })
        })

        //Create responses object to send to patch request
        const newResponseNum =  {
            "responses": schedule.responses + 1
        }
        //Edit the schedule in the schedule database with the updated number of responses
        fetch(`${config.API_ENDPOINT}/schedules/${schedId}`, {
            method: 'PATCH',
            body: JSON.stringify(newResponseNum),
            headers: {
              'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok){
              throw new Error(res.status)
            }
            //return res.json()
        })
        .then(data =>{
            const schedToOverride = {
                "id": schedule.id,
                "schedule_name": schedule.schedule_name,
                "people_id": schedule.people_id,
                "status": schedule.status,
                "responses": schedule.responses + 1,
                "start_date": schedule.start_date,
                "end_date": schedule.end_date,
                "meeting_duration": schedule.meeting_duration
        }
            cbEditSchedule(schedToOverride) 
        })
    }


    handleSubmit = (e, cbAddAvail, cbAddPerson, cbEditSchedule, cbRemoveAvail, schedId,) => {
        e.preventDefault()
        let availList = []
        let i, otherAvail, thisAvail
        let previousAvail = []
        const schedule = this.context.schedules.find(s =>
            s.id === parseInt(this.props.match.params.schedId))


        const dupPerson = this.context.people.find(p =>
            p.email === this.state.email.value)
        if (dupPerson !== undefined){
            previousAvail = this.context.avail.filter(a => 
                a.schedule_id === schedule.id)
            previousAvail = previousAvail.filter(a => 
                a.people_id === dupPerson.id
            )     
        }
        
        //if the person's email isn't already in the system
        if (dupPerson === undefined){
            this.addPersonAndAvail(schedule, cbAddPerson, cbAddAvail, cbEditSchedule, availList, schedId)
        }
        else {
            //If the person has already submitted availabity for this schedule
            if (previousAvail.length !== 0){
                otherAvail = this.context.avail.filter(a => 
                    a.schedule_id !== parseInt(this.props.match.params.schedId))
                thisAvail = this.context.avail.filter(a => 
                    a.schedule_id === parseInt(this.props.match.params.schedId))
                thisAvail = thisAvail.filter(a => a.people_id !== dupPerson.id)
                availList = [...otherAvail, ...thisAvail]
                
                //Delete all old avail entries with for this person/schedule pair
                cbRemoveAvail(availList)
                fetch(`${config.API_ENDPOINT}/avail/delete/${dupPerson.id}/${schedule.id}`, {
                    method: 'DELETE',
                    headers: {
                    'content-type': 'application/json',
                    }
                })
                .then(res => {
                    if (!res.ok){
                    throw new Error(res.status)
                    }
                //    return res.json()
                })
                .then(data =>{
                    let newAvail = []
                    for (i=0; i < this.state.timeslots.length; i++){
                        newAvail.push(
                        {
                            "role_name": this.state.role.value,
                            "timeslot": parseInt(this.state.timeslots[i]),
                            "schedule_id": parseInt(schedId),
                            "people_id": dupPerson.id,
                        
                        })
                    }

                    //post avail from either of the last two scenarios
                    fetch(`${config.API_ENDPOINT}/avail`, {
                        method: 'POST',
                        body: JSON.stringify(newAvail),
                        headers: {
                        'content-type': 'application/json',
                        }
                    })
                    .then(res => {
                        if (!res.ok){
                        throw new Error(res.status)
                        }
                        return res.json()
                    })
                    .then(data =>{
                        let addAvailToList = []
                        data.map(data => {
                            addAvailToList.push({
                                "id": data.id,
                                "role_name": data.role_name,
                                "timeslot": data.timeslot,
                                "schedule_Id": data.schedule_id,
                                "people_id": data.people_id,
                            })
                        })
                        cbAddAvail(addAvailToList) 
                }) 
                      
                })
                //re-post new availablity:: let's do this down lower
            }
            else{//if the person exists in the database, but hasn't submitted avail for this sched
                
                //edit schedule with new num of responses
                //Create responses object to send to patch request
                const newResponseNum =  {
                    "responses": schedule["responses"] + 1
                }
                //Edit the schedule in the schedule database with the updated number of responses
                fetch(`${config.API_ENDPOINT}/schedules/${schedId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(newResponseNum),
                    headers: {
                    'content-type': 'application/json',
                    }
                })
                .then(res => {
                    if (!res.ok){
                    throw new Error(res.status)
                    }
                    //return res.json()
                })
                .then(data =>{
                    const schedToOverride = {
                        "id": schedule.id,
                        "schedule_name": schedule.schedule_name,
                        "people_id": schedule.people_id,
                        "status": schedule.status,
                        "responses": schedule.responses + 1,
                        "start_date": schedule.start_date,
                        "end_date": schedule.end_date,
                        "meeting_duration": schedule.meeting_duration
                    }
                    cbEditSchedule(schedToOverride) 
                })
            
                //Create avail list to send for either of the last two scenarios
                let newAvail = []
                for (i=0; i < this.state.timeslots.length; i++){
                    newAvail.push(
                    {
                        "role_name": this.state.role.value,
                        "timeslot": parseInt(this.state.timeslots[i]),
                        "schedule_id": parseInt(schedId),
                        "people_id": dupPerson.id,
                    
                    })
                }

                //post avail from either of the last two scenarios
                fetch(`${config.API_ENDPOINT}/avail`, {
                    method: 'POST',
                    body: JSON.stringify(newAvail),
                    headers: {
                    'content-type': 'application/json',
                    }
                })
                .then(res => {
                    if (!res.ok){
                    throw new Error(res.status)
                    }
                    return res.json()
                })
                .then(data =>{
                    let addAvailToList = []
                    data.map(data => {
                        addAvailToList.push({
                            "id": data.id,
                            "role_name": data.role_name,
                            "timeslot": data.timeslot,
                            "schedule_Id": data.schedule_id,
                            "people_id": data.people_id,
                        })
                    })
                    cbAddAvail(addAvailToList) 
                }) 
            }  
            
        }
        this.props.history.push(`/submitted`)
    }


    render(){
        const schedId = parseInt(this.props.match.params.schedId)
        const schedule = this.context.schedules.find(s =>
            s.id === parseInt(schedId))
        const roles = this.context.roles.filter(role => 
            role.schedule_id === schedId)
        const timeslots = this.context.timeslots.filter(ts =>
            ts.schedule_id === schedId)
        if (schedule && roles && timeslots){
        return(
            
            <div className='avail-form'>
                <h1>{schedule.schedule_name}</h1>
                <form 
                    onSubmit={e => {this.popupBeforeSubmit(
                        e, 
                        this.context.addAvail, 
                        this.context.addPerson, 
                        this.context.editSchedule,
                        this.context.removeAvail, 
                        schedId)}}>
                    <label>First name:</label>
                    <input 
                        name='participant-first-name'
                        onChange={e => this.updateFirstName(e.target.value)}/>
                    <span className={this.displayFirstNameWarning()}>{this.validateFirstName()}</span> 
                    <br/>
                    <label>Last name:</label>
                    <input 
                        name='participant-last-name'
                        onChange={e => this.updateLastName(e.target.value)}/>
                    <span className={this.displayLastNameWarning()}>{this.validateLastName()}</span> 
                    <br/>
                    <label>Email Address:</label>
                    <input 
                        name='participant-email'
                        onChange={e => this.updateEmail(e.target.value)}/>
                    <span className={this.displayEmailWarning()}>{this.validateEmail()}</span> 
                    <br/>
                    <label>Role:</label>
                    <select
                        onChange={e => this.updateRole(e.target.value)}>
                            <option>Select role</option>
                        {roles.map(role =>
                            <option
                                key={role.id}>
                                {role.role_name}
                            </option>)}
                    </select>
                    <span className={this.displayRoleWarning()}>{this.validateRole()}</span> 
                    <br/>
                    <label>Select Available Timeframes</label>
                    <br/>
                    <ul>
                        {timeslots.map(ts =>
                        <li key={ts.id}>
                           <input
                                type="checkbox" 
                                id={ts.id} 
                                name={ts.timeslot} 
                                value={ts.id}
                                onChange={e => this.updateTimeslots(e, ts.day_name)}/>
                           <label>{ts.day_name}: {ts.timeslot}</label>
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
        else{
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }
}

export default withRouter(AvailForm)

AvailForm.propTypes = {
    history: PropTypes.object.isRequired
}
