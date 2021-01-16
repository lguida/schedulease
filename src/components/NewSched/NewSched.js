import React from 'react'
import ScheduleaseContext from '../../ScheduleaseContext'
import './NewSched.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimeSpanPickerPerDay from "../TimeSpanPickerPerDay/TimeSpanPickerPerDay"
import NewTimeslots from "../NewTimeslots/NewTimeslots"
import config from '../../config'


class NewSched extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            scheduleName: {
                value: "",
                touched: false
            },
            newRole: {
                value: "",
                touched: false,
            },
            roles: ["Manager", "Employee"],
            duration: "1 hour",
            timeslots: [],
            timeslotTouched: false,
            startDate: '',
            endDate: '',
            days: [
                {
                    value: "Monday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },
                {
                    value: "Tuesday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },
                {
                    value: "Wednesday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },
                {
                    value: "Thursday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },
                {
                    value: "Friday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },
                {
                    value: "Saturday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },
                {
                    value: "Sunday",
                    start: {
                        hour: 9,
                        min: 0,
                        ampm: "AM"},
                    end: {
                        hour: 17, 
                        min: 0,
                        ampm: "PM"},
                },   
            ],
        }
    }

    updateName = (name) => {
        this.setState({ scheduleName: { value: name, touched: true} })
    }

    updateRole = (role) => {
        this.setState({ newRole: { value: role, touched: true} })
    }

    addRole = (role, e) => {
        e.preventDefault()
        if (role.split(" ").join("").length !==0){
        this.setState({
            roles: [...this.state.roles, role],
            newRole: {value: '', touched: false}
        })
    }
    }

    deleteRole = (role, e) => {
        e.preventDefault()
        const roles = this.state.roles.filter(r =>
            r !== role)
        this.setState({
            roles: roles
        })
    }

    updateDuration = (duration) => {
        this.setState({ duration: duration })
    }

    updateStartDatetime = (value) =>{
        this.setState({ 
            startDate: value
        })
    }

    updateEndDatetime = (value) =>{
        this.setState({ 
            endDate: value
        })
    }

    updateTimeframe = (value) => {
        this.setState({
            days: value
        })
    }

    updateTimeslots = (isChecked, object) => {
        if (isChecked){
            this.setState ({
                timeslots: [...this.state.timeslots, object],
                timeslotTouched: true
            })
        }
        else{
            let tsOtherDays = this.state.timeslots.filter(t =>
                t.day !== object.day)
            let tsThisDay = this.state.timeslots.filter(t =>
                t.day === object.day)
            let tsToKeep = [...tsThisDay.filter(t=> 
                t.time !== object.time), ...tsOtherDays]
            this.setState({
                timeslots: tsToKeep,
                timeslotTouched: true
            })
        } 
    }

    selectAllTimeslots = (isChecked, timeslots) => {
        if (isChecked){
            this.setState ({
                timeslots: [...timeslots],
                timeslotTouched: true
            })
        }
        else {
            this.setState ({
                timeslots: [],
                timeslotTouched: true
            })
        }
    }

    validateSchedName = () => {
        const name = this.state.scheduleName.value.trim()
        const schedsPerUser = this.context.schedules.filter(s =>
            s.user_id === this.props.match.params.userId)
        const dup = schedsPerUser.filter(sched =>
            sched.schedule_name.toUpperCase() === name.toUpperCase())
        if (name.length === 0){
            return "*Schedule name is required"
        }
        else if (dup.length !== 0){
            return "*Schedule name already exits! Name it something else."
        }
    }

    displaySchedNameWarning = () => {
        const message = this.validateSchedName()
        if (message && this.state.scheduleName.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateNewRole = () => {
        let checkDups
        if (this.state.roles[0] !== undefined){
            checkDups = this.state.roles.filter(r =>
                r.toUpperCase() === this.state.newRole.value.toUpperCase())
                if (checkDups.length !== 0){
                    return "Roles must be distinct."
                }
        }
        else if (this.state.newRole.value.trim().length === 0){
            return "You haven't entered a name for your role yet!"
        }
    }

    displayNewRoleWarning = () => {
        const message = this.validateNewRole()
        if (message && this.state.newRole.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateRoles = () => {
        if (this.state.roles.length === 0){
            return "*Enter at least one role. If you don't need that function, consider naming your role something like 'General'."
        }
    }


    validateDates = () => {
        const start = new Date(this.state.startDate)
        const end = new Date(this.state.endDate)
        if (start.getTime() > end.getTime()){
            return "*Start date must be before end date"
        }
        else if (this.state.startDate.length === 0){
            return "*Enter a start date"
        }
        else if (this.state.endDate.length === 0){
            return "*Enter an end date"
        }
    }


    validateTimeslots = () => {
        if (this.state.timeslots.length === 0){
            return "*Select at least one timeslot"
        }
    }

    displayWarnings = (validateFunction) => {
        const message = validateFunction()
        if (message){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    addMonthAndDate = (newSchedId) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let counter = new Date(this.state.startDate)
        let timeslotsToAdd = []
        let dayOfWeek
        while(counter <= new Date(this.state.endDate)){
            dayOfWeek = weekDays[counter.getDay()]
            this.state.timeslots.filter(ts => ts.day === dayOfWeek)
                .forEach(ts => timeslotsToAdd.push(
                    {
                    "schedule_id": newSchedId,
                    "timeslot": ts.time,
                    "day_name": ts.day + ", " + months[counter.getMonth()] + " " + counter.getDate()
                }))
            counter.setDate(counter.getDate() +1)
        }
        return(timeslotsToAdd)
        
    }

    postRolesAndTimeslots = (newSchedId, cbAddRoles, cbAddTS) => {
        let rolesToAdd = []
        this.state.roles.map(role => 
            rolesToAdd.push({
                "schedule_id": newSchedId,
                "role_name": role,
            })
        )
        fetch(`${config.API_ENDPOINT}/roles`, {
            method: 'POST',
            body: JSON.stringify(rolesToAdd),
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
                let addRolesToList = []
                data.map(data => {
                    addRolesToList.push({
                        "id": data.id,
                        "schedule_id": data.schedule_id,
                        "role_name": data.role_name
                    })
                })
            cbAddRoles(addRolesToList)
        })

        let timeslotsToAdd = this.addMonthAndDate(newSchedId)
        fetch(`${config.API_ENDPOINT}/timeslots`, {
            method: 'POST',
            body: JSON.stringify(timeslotsToAdd),
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
                let addTimeslotsToList = []
                data.map(data => {
                    addTimeslotsToList.push({
                        "id": data.id,
                        "schedule_id": data.schedule_id,
                        "timeslot": data.timeslot,
                        "day": data.day_name
                    })
                })
            cbAddTS(addTimeslotsToList)
        })
       
    }

    handleSubmit = (e, cbAddSched, cbAddRoles, cbAddTS) => {
        e.preventDefault()
        const scheduleToAdd = {
            "schedule_name": this.state.scheduleName.value,
            "people_id": parseInt(this.props.match.params.userId),
            "status": "open",
            "responses": 0,
            "start_date": this.state.startDate,
            "end_date": this.state.endDate,
            "meeting_duration": this.state.duration
        }

        fetch(`${config.API_ENDPOINT}/schedules`, {
            method: 'POST',
            body: JSON.stringify(scheduleToAdd),
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
              const addScheduleToList = {
                    "id": data.id,
                    "schedule_name": this.state.scheduleName.value,
                    "people_id": this.props.match.params.userId,
                    "status": "open",
                    "responses": 0,
                    "start_date:": this.state.startDate,
                    "end_date": this.state.endDate,
                    "meeting_duration": this.state.duration
                }
            cbAddSched(addScheduleToList)
            this.postRolesAndTimeslots(data.id, cbAddRoles, cbAddTS)
            this.props.history.push(`/dashboard/schedule-list/${this.props.match.params.userId}`)
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className='new-schedule'>
                <form
                    onSubmit={e => {this.handleSubmit(e, this.context.addSchedule, this.context.addRoles, this.context.addTimeslots)}}>  
                    <label>Schedule name:</label>
                    <br/>
                    <input  
                        type='text'
                        name='sched-name'
                        onChange={e => this.updateName(e.target.value)}/>
                    <br/>
                    <span className={this.displaySchedNameWarning()}>{this.validateSchedName()}</span> 
                    <br/>
                    <br/>
                    <label>Roles:</label>
                    <br/>
                    <ul className='roles-ul'>
                        {this.state.roles.map(role =>
                            <li key={role}>
                                <button 
                                    onClick={e => this.deleteRole(role, e)}>
                                    Delete
                                </button>
                                {role} 
                            </li>
                        )}
                    </ul>
                    <span className={this.displayWarnings(this.validateRoles)}>
                        {this.validateRoles()}
                    </span> 
                    <div className='add-role-mini-form'>
                        <input 
                            type='text' 
                            name='roles-input'
                            value={this.state.newRole.value}
                            onChange={e => this.updateRole(e.target.value)}/>
                        <button 
                            className='add-role-button'
                            disabled={this.validateNewRole()}
                            onClick={(e) => this.addRole(this.state.newRole.value, e)}>
                            Add Role
                        </button>
                    </div>
                    <br/>
                    <span className={this.displayNewRoleWarning()}>
                        {this.validateNewRole()}
                    </span> 
                    
                    <br/>
                    <div className='meeting-duration-option'>
                        <label>Meeting duration:</label>
                        <select
                            defaultValue="1 hour"
                            onChange={e => this.updateDuration(e.target.value)}>
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>45 minutes</option>
                            <option>1 hour</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <label>Select a date frame to use:</label>
                    </div>
                    <br/>
                    <div>
                        <div className='date-frame-select'>
                            <label>Start:</label>
                            <br/>
                            <DatePicker 
                                selected={this.state.startDate} 
                                onChange={this.updateStartDatetime}
                            />
                            
                            <br />
                            <br />
                            <label>End:</label>
                            <br/>
                            <DatePicker 
                                selected={this.state.endDate} 
                                onChange={this.updateEndDatetime}/>
                        
                            <br />
                            <span className={this.displayWarnings(this.validateDates)}>
                                {this.validateDates()}
                            </span> 
                        </div>
                        <br />
                        <TimeSpanPickerPerDay 
                            updateTimeframe={this.updateTimeframe}
                            days={this.state.days}/>
                    </div>
                    
                    <label>Select Available Timeslots:</label>
                    <br/>
                    <span className={this.displayWarnings(this.validateTimeslots)}>
                        {this.validateTimeslots()}
                    </span> 

                    <NewTimeslots 
                        days={this.state.days}
                        timeslotsState={this.state.timeslots}
                        duration={this.state.duration}
                        updateTimeslots={this.updateTimeslots}
                        selectAllTimeslots={this.selectAllTimeslots}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                    />
                    
                    <button 
                        className='create-new-sched-button'
                        type='submit'
                        disabled={
                            this.validateSchedName() ||
                            this.validateRoles() ||
                            this.validateDates() ||
                            this.validateTimeslots()
                        }
                    >
                        Create Schedule
                    </button>
                    <br/>
                </form>
            </div>
        )
    }
}

export default withRouter(NewSched)

NewSched.propTypes = {
    history: PropTypes.object.isRequired
}


