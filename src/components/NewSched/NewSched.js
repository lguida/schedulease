import React from 'react'
import ScheduleaseContext from '../../ScheduleaseContext'
import './NewSched.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimeSpanPickerPerDay from "../TimeSpanPickerPerDay/TimeSpanPickerPerDay"
import NewTimeslots from "../NewTimeslots/NewTimeslots"


class NewSched extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            scheduleName: {
                value: "",
                touched: false
            },
            roleValue: "",
            roles: ["Manager", "Employee"],
            warning: "hidden",
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
            startTimeframe: {
                hour: 9,
                ampm: "AM"
            },
            endTimeframe: {
                hour: 9,
                ampm: "AM",
            }
            
        }
    }

    updateName = (name) => {
        this.setState({ scheduleName: { value: name, touched: true} })
    }

    updateRole = (role) => {
        this.setState({ roleValue: role })
    }

    addRole = (role, e) => {
        e.preventDefault()
        const checkDups = this.state.roles.filter(r =>
            r.toUpperCase() === role.toUpperCase())
        if (checkDups.length === 0){
            this.setState({
                roles: [...this.state.roles, role],
                warning: "hidden" 
            })
        }
        else {
            this.setState({
                warning: "warning"
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
        this.setState({ startDate: value })
    }

    updateEndDatetime = (value) =>{
        this.setState({ endDate: value })
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
            let newTimeslots = this.state.timeslots.filter(t =>
                t.time !== object.time && t.day !== object.day)
            this.setState({
                timeslots: newTimeslots,
                timeslotTouched: true
            })
        } 
    }
   
    validateNewSched = () => {
        const name = this.state.scheduleName.value.trim()
        const dup = this.context.schedules.filter(sched =>
            sched.schedule_name.toUpperCase() === name.toUpperCase())
        if (name.length === 0){
            return "Schedule name is required"
        }
        else if (dup.length !== 0){
            return "Schedule name already exits! Name it something else."
        }
        else if (this.state.timeslots.length === 0){
            return "Select at least one timeslot."
        }
    }

    displayWarning = () => {
        if (this.state.scheduleName.touched){
            return this.validateNewSched()
        }

    }

    handleSubmit = (e, callback) => {
        e.preventDefault()
        const scheduleToAdd = {
            "id": 3, //need to figure out id system uuid?
            "schedule_name": this.state.scheduleName.value,
            "status": "open",
            "deadline": "Dec 5th, 2020",// needs to be added
            "responses": 0,
            "roles": this.state.roles,
            "timeslots": this.state.timeslots,
            "startTimeframe:": this.state.startTimeframe,
            "endTimeframe": this.state.endTimeframe,
            "meeting_duration": this.state.duration

        }
        callback(scheduleToAdd)
        this.props.history.push('/dashboard/schedule-list')
    }

    render(){
        return(
            <div className='new-schedule'>
                <form
                    onSubmit={e => {this.handleSubmit(e, this.context.addSchedule)}}>
                        
                    <label htmlFor='sched-name'>Schedule name:</label>
                    <input  
                        type='text'
                        name='sched-name'
                        onChange={e => this.updateName(e.target.value)}/>
                    <br/>

                    <label htmlFor='roles-input'>Roles:</label>
                    <input 
                        type='text' 
                        name='roles-input'
                        onChange={e => this.updateRole(e.target.value)}/>
                    <button 
                        onClick={(e) => this.addRole(this.state.roleValue, e)}>
                        Add Role
                    </button>
                    <ul>
                        {this.state.roles.map(role =>
                            <li key={role}>{role} 
                            <button 
                                onClick={e => this.deleteRole(role, e)}>
                                Delete
                            </button></li>
                        )}
                    </ul>
                    <span className={this.state.warning}>Roles names must be distinct</span>
                    <br/>

                    <label htmlFor='meeting-duration'>Meeting duration:</label>
                    <select
                        defaultValue="1 hour"
                        onChange={e => this.updateDuration(e.target.value)}>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>1 hour</option>
                    </select>
                    <br/>
                    <label htmlFor="timeframe">Select a timeframe to use:</label>
                    <div name='timeframe'>
                        <label>Start:</label>
                        <DatePicker onChange={this.updateStartDatetime}/>
                        <br />
                        <label>End:</label>
                        <DatePicker onChange={this.updateEndDatetime}/>
                        <br />
                        
                        <TimeSpanPickerPerDay 
                            updateTimeframe={this.updateTimeframe}
                            days={this.state.days}/>

                    </div>
                    
                    <label htmlFor='Avail'>Select Available Timeslots</label>
                    <br/>

                    <NewTimeslots 
                        days={this.state.days}
                        duration={this.state.duration}
                        updateTimeslots={this.updateTimeslots}
                    />
                    
                    <button 
                        type='submit'
                        disabled={this.validateNewSched()}
                    >
                        Create Schedule
                    </button>
                    <br/>
                    <span className="warning">{this.displayWarning()}</span>
                </form>
            </div>
        )
    }
}

export default withRouter(NewSched)

NewSched.propTypes = {
    history: PropTypes.object.isRequired
}

//create some kind of default "General" role if no additional roles are provided
//rework the validation and warnings
