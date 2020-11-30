import React from 'react'
import ScheduleaseContext from '../../ScheduleaseContext'
import './NewSched.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


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
            startTimeframe: {
                hour: 9,
                ampm: "AM"},
            endTimeframe: {
                hour: 5, 
                ampm: "PM"},
            
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

    updateTimeframe = (which, value) => {
        if (which === "startNum"){
            this.setState({
                startTimeframe: { hour: value, ampm: this.state.startTimeframe.ampm} 
            })
        }
        if (which === "startAmPm"){
            this.setState({
                startTimeframe: { hour: this.state.startTimeframe.hour, ampm: value} 
            })
        }
        if (which === "endNum"){
            this.setState({
                endTimeframe: { hour: value, ampm: this.state.endTimeframe.ampm} 
            })
        }
        if (which === "endAmPm"){
            this.setState({
                endTimeframe: { hour: this.state.endTimeframe.hour, ampm: value} 
            })
        }
    }

    updateTimeslots = (e) => {
        if (e.target.checked){
            this.setState ({
                timeslots: [...this.state.timeslots, e.target.value],
                timeslotTouched: true
            })
        }
        else{
            let newTimeslots = this.state.timeslots.filter(t =>
                t !== e.target.value)
            this.setState({
                timeslots: newTimeslots,
                timeslotTouched: true
            })
        } 
    }
   
    createTimeslots = () => {
        let startMT, endMT, i
        let slotList = []

        if (this.state.startTimeframe.ampm === "PM"){
            startMT = parseInt(this.state.startTimeframe.hour) + 12
        }
        else{
            startMT = parseInt(this.state.startTimeframe.hour)
        }
        if (this.state.endTimeframe.ampm === "PM"){
            endMT = parseInt(this.state.endTimeframe.hour) + 12
        }
        else{
            endMT = parseInt(this.state.endTimeframe.hour)
        }


        if (this.state.duration === "15 minutes"){
            slotList = []
            for (i=startMT; i <= endMT; i++){
                if (i>12){
                    slotList = [...slotList, 
                        (i - 12) + ":00PM",
                        (i - 12) + ":15PM",
                        (i - 12) + ":30PM",
                        (i - 12) + ":45PM",
                    ]
                }
                else{
                    slotList = [...slotList, 
                        i + ":00AM",
                        i + ":15AM",
                        i + ":30AM",
                        i + ":45AM",
                    ]
                }
            }
        }
        if (this.state.duration === "30 minutes"){
            slotList = []
            for (i=startMT; i <= endMT; i++){
                if (i>12){
                    slotList = [...slotList, 
                        (i - 12) + ":00PM",
                        (i - 12) + ":30PM",
                    ]
                }
                else{
                    slotList = [...slotList, 
                        i + ":00AM",
                        i + ":30AM",
                    ]
                }
            }
        }
        if (this.state.duration === "1 hour"){
            slotList = []
            for (i=startMT; i <= endMT; i++){
                if (i>12){
                    slotList = [...slotList, (i - 12) + ":00PM"]
                }
                else{
                    slotList = [...slotList, i + ":00AM"]
                }
            }
        }
        if (startMT === endMT){
            slotList = ['same']
        }
        return slotList
    }

    createTimeslotsJSX = () => {
        const timeslots = this.createTimeslots()

        if (timeslots.length === 0){
            return(
                <span className='warning'>The start timeframe must be before the end timeframe.</span>
            )
        }
        if (timeslots[0] === 'same'){
            return (
                <span className='warning'>The start and end of the timeframe can't be the same.</span>
            )
        }
        else{
            return (
                timeslots.map(timeslot => 
                    <>
                    <input 
                        type="checkbox" 
                        key={timeslot} 
                        name={timeslot} 
                        value={timeslot}
                        onChange={e => this.updateTimeslots(e)}/>
                    <label key={timeslot + "label"} htmlFor={timeslot}>{timeslot}</label><br/>
                    </>)
            )
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
        const timeslotsHtml = this.createTimeslotsJSX()
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
                        <option>1 hour</option>
                    </select>
                    <br/>
                    <label htmlFor="timeframe">Select a timeframe to use:</label>
                    <div name='timeframe'>
                        <label>Start:</label>
                        <select 
                            defaultValue={9}
                            onChange={e => this.updateTimeframe("startNum", e.target.value)}>
                            <option value={1}>1:00</option>
                            <option value={2}>2:00</option>
                            <option value={3}>3:00</option>
                            <option value={4}>4:00</option>
                            <option value={5}>5:00</option>
                            <option value={6}>6:00</option>
                            <option value={7}>7:00</option>
                            <option value={8}>8:00</option>
                            <option value={9}>9:00</option>
                            <option value={10}>10:00</option>
                            <option value={11}>11:00</option>
                            <option value={12}>12:00</option>
                        </select>
                        <select 
                            defaultValue="AM"
                            onChange={e => this.updateTimeframe("startAmPm", e.target.value)}>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                        <br/>
                        <label>End:</label>
                        <select 
                            defaultValue={5}
                            onChange={e => this.updateTimeframe("endNum", e.target.value)}>
                            <option value={1}>1:00</option>
                            <option value={2}>2:00</option>
                            <option value={3}>3:00</option>
                            <option value={4}>4:00</option>
                            <option value={5}>5:00</option>
                            <option value={6}>6:00</option>
                            <option value={7}>7:00</option>
                            <option value={8}>8:00</option>
                            <option value={9}>9:00</option>
                            <option value={10}>10:00</option>
                            <option value={11}>11:00</option>
                            <option value={12}>12:00</option>
                        </select>
                        <select 
                            defaultValue="PM"
                            onChange={e => this.updateTimeframe("endAmPm", e.target.value)}>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                    </div>
                    <label htmlFor='Avail'>Select Available Timeslots</label>
                    <br/>
                    <div name='Avail'>
                        {timeslotsHtml}
                    </div>
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
//figure out how to display timeslots in 2 columns perhaps 4 for 15 min intervals?
//Then: add completed schedule to store.
