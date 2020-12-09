import React from 'react'
import './NewTimeslots.css'
import PropTypes from 'prop-types'
import ScheduleaseContext from '../../ScheduleaseContext'

class NewTimeslot extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            weekdayAllChecked: false,
            weekendAllCheckd: false,
            boxes: {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: [],
            }
        }
    }

    updateTimeslots = (e, day) => {
        const pairToSend = {time: e.target.value, day: day}
        if (e.target.checked){
            this.props.updateTimeslots(true, pairToSend)
        }
        else{
            this.props.updateTimeslots(false, pairToSend)
        } 
    }

    checkedOrNo = () => {
        
    }

    selectAll = (e, timeslots) => {
        const weekdays = {
            Monday: timeslots.Monday, 
            Tuesday: timeslots.Tuesday, 
            Wednesday: timeslots.Wednesday, 
            Thursday: timeslots.Thursday, 
            Friday: timeslots.Friday,}
        const weekendSlots = this.props.timeslotsState.filter(slot =>
            slot.day === "Saturday" || slot.day=== "Sunday")
        
    }

    selectAllWeekends = (e, timeslots) => {
        const weekends = {
            Saturday: timeslots.Saturday, 
            Sunday: timeslots.Sunday, }
    }

    createTimeslots = () => {
        let timeslots = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        }
        let checked = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        }

        let timeCounter, end, duration, placeholder, toAdd
        
        if (this.props.duration === "15 minutes"){
            duration = .25
        }
        else if (this.props.duration === "30 minutes"){
            duration = .5
        }
        else if (this.props.duration === "45 minutes"){
            duration = .75
        }
        else {
            duration = 1
        }

        this.props.days.forEach(day =>{
            timeCounter = this.context.convertMinutesToFloat(day.start.hour, day.start.min)
            end = this.context.convertMinutesToFloat(day.end.hour, day.end.min)
            while ((timeCounter + duration) <= end){
                placeholder = this.context.convertFloatHoursToMinutes(timeCounter)
                if (timeCounter >= 12){
                    if (placeholder.min === 0){
                        if (placeholder.hour - 12 === 0) {
                            toAdd = "12:00PM"
                        }
                        else{
                            toAdd = (placeholder.hour - 12) + ":00PM"
                        }
                    }
                    else{
                        if (placeholder.hour - 12 === 0) {
                            toAdd = 12 + ":" + placeholder.min + "PM"
                        }
                        else{
                            toAdd = (placeholder.hour - 12) + ":" + placeholder.min + "PM"
                        }
                    }
                }
                else{
                    if (placeholder.min === 0){
                        toAdd = placeholder.hour + ":00AM"
                    }
                    else{
                        toAdd = placeholder.hour + ":" + placeholder.min + "AM"
                    }
                }
                timeslots[day.value].push(toAdd)
                checked[day.value].push({value: toAdd, checked: ""})
                timeCounter = timeCounter + duration
            }
        })
        
        
        
        return timeslots
    }


    render(){
        const timeslots = this.createTimeslots()

        return(
            <div name='Avail'>
                <input 
                type="checkbox" 
                name="select-all"
                onChange={e => this.selectAll(e, timeslots)}/>
                <label htmlFor="select-all">Select All</label>
                <table>
                    <thead>
                        <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <ul>
                                {timeslots.Monday.map(slot =>
                                    <li key={slot + "Monday"}>
                                        <input 
                                        type="checkbox" 
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Monday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {timeslots.Tuesday.map(slot =>
                                    <li key={slot + "Tuesday"}>
                                        <input 
                                        type="checkbox" 
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Tuesday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {timeslots.Wednesday.map(slot =>
                                    <li key={slot + "Wednesday"}>
                                        <input 
                                        type="checkbox" 
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Wednesday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {timeslots.Thursday.map(slot =>
                                    <li key={slot + "Thursday"}>
                                        <input 
                                        type="checkbox" 
                                        checked=""
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Thursday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {timeslots.Friday.map(slot =>
                                    <li key={slot + "Friday"}>
                                        <input 
                                        type="checkbox" 
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Friday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        </tr>
                    </tbody>
                </table>
                <input 
                type="checkbox" 
                name="select-all-weekends"
                onChange={e => this.selectAllWeekends(e, timeslots)}/>
                <label htmlFor="select-all-weekends">Select All (weekends)</label>
                <table>
                    <thead>
                        <tr>
                        <th>Sunday</th>
                        <th>Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <ul>
                                {timeslots.Saturday.map(slot =>
                                    <li key={slot + "Saturday"}>
                                        <input 
                                        type="checkbox" 
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Saturday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {timeslots.Sunday.map(slot =>
                                    <li key={slot + "Sunday"}>
                                        <input 
                                        type="checkbox" 
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Sunday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default NewTimeslot

NewTimeslot.propTypes = {
    days: PropTypes.array.isRequired,
    updateTimeslots: PropTypes.func.isRequired,
    duration: PropTypes.string.isRequired,
 }