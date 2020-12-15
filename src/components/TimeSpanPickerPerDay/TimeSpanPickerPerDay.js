import React from 'react'
import './TimeSpanPickerPerDay.css'
import PropTypes from 'prop-types'
import ScheduleaseContext from '../../ScheduleaseContext'
import { v4 as uuidv4 } from 'uuid'

class TimeSpanPickerPerDay extends React.Component {
    static contextType = ScheduleaseContext

    createTimeDropdownJSX = () =>{
        let times = [1,2,3,4,5,6,7,8,9,10,11,12]
        return (
            times.map(time =>
                <>
                <option key={uuidv4()} value={time}>{time}:00</option>
                <option key={uuidv4()} value={(time + .25)}>{time}:15</option>
                <option key={uuidv4()} value={(time + .5)}>{time}:30</option>
                <option key={uuidv4()} value={(time + .75)}>{time}:45</option>
                </>
            )
        )
    }

    prepTimeframe = (startEnd, hourAmpm, value, day) => {
        const dayName = this.props.days.find(wkday =>
            wkday.value === day)
        const dayIndex = this.props.days.indexOf(dayName)
        let shallowCopy = this.props.days
        let  dayToUpdate = {}
        let newHour, newMin

        if (startEnd === "start"){
            if (hourAmpm === "Num"){
                if (this.props.days[dayIndex].start.ampm === "PM"){
                    newHour = parseInt(value) + 12
                }
                else{
                    newHour = parseInt(value)
                }
                const newFloat = parseFloat(value) - parseInt(value)
                if (newFloat === 0){
                    newMin = 0
                }
                else if (newFloat === .25){
                    newMin = 15
                }
                else if (newFloat === .5){
                    newMin = 30
                }
                else{
                    newMin = 45
                }

                dayToUpdate = {
                    value: this.props.days[dayIndex].value,
                    start: {
                        hour: newHour,
                        min: newMin,
                        ampm: this.props.days[dayIndex].start.ampm},
                    end: {
                        hour: this.props.days[dayIndex].end.hour, 
                        min: this.props.days[dayIndex].end.min,
                        ampm: this.props.days[dayIndex].end.ampm},
                }
            }
            else {
                if (value === "PM"){
                    newHour = parseInt(this.props.days[dayIndex].start.hour) + 12
                }
                else{
                    newHour = parseInt(this.props.days[dayIndex].start.hour) - 12
                }
                dayToUpdate = {
                    value: this.props.days[dayIndex].value,
                    start: {
                        hour: newHour,
                        min: this.props.days[dayIndex].start.min,
                        ampm: value},
                    end: {
                        hour: this.props.days[dayIndex].end.hour, 
                        min: this.props.days[dayIndex].end.min,
                        ampm: this.props.days[dayIndex].end.ampm},
                }
            }
        }
        else {
            if (hourAmpm === "Num"){
                if (this.props.days[dayIndex].end.ampm === "PM"){
                    newHour = parseInt(value) + 12
                }
                else{
                    newHour = parseInt(value)
                }
                const newFloat = parseFloat(value) - parseInt(value)
                if (newFloat === 0){
                    newMin = 0
                }
                else if (newFloat === .25){
                    newMin = 15
                }
                else if (newFloat === .5){
                    newMin = 30
                }
                else{
                    newMin = 45
                }

                dayToUpdate = {
                    value: this.props.days[dayIndex].value,
                    start: {
                        hour: this.props.days[dayIndex].start.hour,
                        min: this.props.days[dayIndex].start.min,
                        ampm: this.props.days[dayIndex].start.ampm},
                    end: {
                        hour: newHour, 
                        min: newMin,
                        ampm: this.props.days[dayIndex].end.ampm},
                }
            }
            else {
                if (value === "PM"){
                    newHour = parseInt(this.props.days[dayIndex].end.hour) + 12
                }
                else{
                    newHour = parseInt(this.props.days[dayIndex].end.hour) - 12
                }
                dayToUpdate = {
                    value: this.props.days[dayIndex].value,
                    start: {
                        hour: this.props.days[dayIndex].start.hour,
                        min: this.props.days[dayIndex].start.min,
                        ampm: this.props.days[dayIndex].start.ampm},
                    end: {
                        hour: newHour,
                        min: this.props.days[dayIndex].end.min,
                        ampm: value},
                }
            }
        }

        shallowCopy[dayIndex] = dayToUpdate

        this.props.updateTimeframe(shallowCopy)
    }

    getStateValue = (startEnd, day) => {
        const dayName = this.props.days.find(wkday =>
            wkday.value === day)
        const dayIndex = this.props.days.indexOf(dayName)
        let valueToReturn
        if (startEnd === "start"){
            valueToReturn = this.props.days[dayIndex].start.hour
            if (this.props.days[dayIndex].start.min === 15){
                valueToReturn += .25
            }
            else if (this.props.days[dayIndex].start.min === 30){
                valueToReturn += .50
            }
            else if (this.props.days[dayIndex].start.min === 45){
                valueToReturn += .75
            }
        }
        else if (startEnd === "end"){
            valueToReturn = this.props.days[dayIndex].end.hour
            if (this.props.days[dayIndex].end.min === 15){
                valueToReturn += .25
            }
            else if (this.props.days[dayIndex].end.min === 30){
                valueToReturn += .50
            }
            else if (this.props.days[dayIndex].end.min === 45){
                valueToReturn += .75
            }
        }
        if (valueToReturn > 12){
            valueToReturn = valueToReturn - 12
        }
       return valueToReturn

    }

    validateTimeframe = (day) => {
        const dayName = this.props.days.find(wkday =>
            wkday.value === day)
        const dayIndex = this.props.days.indexOf(dayName)
        const start = this.context.convertMinutesToFloat(this.props.days[dayIndex].start.hour, this.props.days[dayIndex].start.min)
        const end = this.context.convertMinutesToFloat(this.props.days[dayIndex].end.hour, this.props.days[dayIndex].end.min)
        if (start >=  end){
            return "Start time must be before end time"
        }
    }

    displayTimeframeWarning = (day) => {
        const message = this.validateTimeframe(day)
        if (message){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    render(){
        const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const timeDropdownJSX = this.createTimeDropdownJSX()
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th></th>
                            <th>End Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {daysOfTheWeek.map(day =>
                        <tr key={day}>
                            <td>{day}</td>
                            <td><select 
                                value={this.getStateValue("start", day)}
                                
                                onChange={e => this.prepTimeframe("start", "Num", e.target.value, day)}>
                                    {timeDropdownJSX}
                                </select>
                                <select 
                                    defaultValue="AM"
                                    onChange={e => this.prepTimeframe("start", "AmPm", e.target.value, day)}>
                                    <option>AM</option>
                                    <option>PM</option>
                                </select>
                            </td>
                            <td>to</td>
                            <td> <select
                                    value={this.getStateValue("end", day)}
                                    onChange={e => this.prepTimeframe("end","Num", e.target.value, day)}>
                                    {timeDropdownJSX}
                                </select>  
                                <select 
                                    defaultValue="PM"
                                    onChange={e => this.prepTimeframe("end","AmPm", e.target.value, day)}>
                                    <option>AM</option>
                                    <option>PM</option>
                                </select>
                            </td>
                            <td>
                            <span className={this.displayTimeframeWarning(day)}>{this.validateTimeframe(day)}</span> 
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TimeSpanPickerPerDay

TimeSpanPickerPerDay.propTypes = {
   days: PropTypes.array.isRequired,
   updateTimeframe: PropTypes.func.isRequired,
}