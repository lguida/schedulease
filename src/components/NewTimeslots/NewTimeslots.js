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
        }
    }

    updateTimeslots = (e, day) => {
        const pairToSend = {time: e.target.value, day: day}
        if (this.state.weekdayAllChecked === true){
            this.setState({weekdayAllChecked: false})
        }
        if (e.target.checked){
            this.props.updateTimeslots(true, pairToSend)
        }
        else{
            this.props.updateTimeslots(false, pairToSend)
        } 
    }

    selectAll = (e, timeslots) => {
        let tsToSend = []
        for (let day in timeslots) {
            timeslots[day].forEach(ts => 
                tsToSend.push({time: ts, day: day}))
        }
       if(e.target.checked){
           this.setState({
            weekdayAllChecked: true,
           })

           this.props.selectAllTimeslots(true, tsToSend)
        }
        else{
            this.setState({
                weekdayAllChecked: false,
               })
               this.props.selectAllTimeslots(false, tsToSend)
        }
        
    }

    checked = (day, slot) => {
        if (this.state.weekdayAllChecked){
            return "checked"
        }
        else {
            if (this.props.timeslotsState === undefined){
                return ""
            }
            else {
                const inTSList = this.props.timeslotsState.find(ts =>
                    ts.day === day && ts.time === slot)
                if (inTSList !== undefined){
                        return "checked"
                    } 
            }
        }
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

    hideUnusedDays = day => {
        if (this.props.startDate.length === 0 || this.props.endDate.length === 0){
            return "visible"
        }
        else{
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            let counter = new Date(this.props.startDate)
            let weekDaysPresent = []
            let dayOfWeek
            while(counter <= new Date(this.props.endDate)){
                dayOfWeek = weekDays[counter.getDay()]
                weekDaysPresent.push(dayOfWeek)
                counter.setDate(counter.getDate() +1)
            }
            if (weekDaysPresent.some(wkd => wkd === day)=== true){
                
                return "visible"
            }
            else{
                return "hidden"
            }
            
        }
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
                        <th className={this.hideUnusedDays("Monday")}>Monday</th>
                        <th className={this.hideUnusedDays("Tuesday")}>Tuesday</th>
                        <th className={this.hideUnusedDays("Wednesday")}>Wednesday</th>
                        <th className={this.hideUnusedDays("Thursday")}>Thursday</th>
                        <th className={this.hideUnusedDays("Friday")}>Friday</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={this.hideUnusedDays("Monday")}>
                            <ul>
                                {timeslots.Monday.map(slot =>
                                    <li key={slot + "Monday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Monday", slot)}
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Monday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td className={this.hideUnusedDays("Tuesday")}>
                            <ul>
                                {timeslots.Tuesday.map(slot =>
                                    <li key={slot + "Tuesday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Tuesday", slot)}
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Tuesday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td className={this.hideUnusedDays("Wednesday")}>
                            <ul>
                                {timeslots.Wednesday.map(slot =>
                                    <li key={slot + "Wednesday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Wednesday", slot)}
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Wednesday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td className={this.hideUnusedDays("Thursday")}>
                            <ul>
                                {timeslots.Thursday.map(slot =>
                                    <li key={slot + "Thursday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Thursday", slot)}
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Thursday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td className={this.hideUnusedDays("Friday")}>
                            <ul>
                                {timeslots.Friday.map(slot =>
                                    <li key={slot + "Friday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Friday", slot)}
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
                <table>
                    <thead>
                        <tr>
                        <th className={this.hideUnusedDays("Saturday")}>Saturday</th>
                        <th className={this.hideUnusedDays("Sunday")}>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className={this.hideUnusedDays("Saturday")}>
                            <ul>
                                {timeslots.Saturday.map(slot =>
                                    <li key={slot + "Saturday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Saturday", slot)}
                                        name={slot} 
                                        value={slot}
                                        onChange={e => this.updateTimeslots(e, "Saturday")}/>
                                        <label htmlFor={slot}>{slot}</label>
                                    </li>)}
                            </ul>
                        </td>
                        <td className={this.hideUnusedDays("Sunday")}>
                            <ul>
                                {timeslots.Sunday.map(slot =>
                                    <li key={slot + "Sunday"}>
                                        <input 
                                        type="checkbox" 
                                        checked={!!this.checked("Sunday", slot)}
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