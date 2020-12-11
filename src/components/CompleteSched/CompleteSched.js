import React from 'react'
import './CompleteSched.css'
import ScheduleaseContext from '../../ScheduleaseContext'


class CompleteSched extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            roles: [],
            completeSched: []
        }
    }

    updateRoleNum = (e, role) => {
        if (e.target.value !=="" && isNaN(parseInt(e.target.value)) === false){
            let thisRole = this.state.roles.find(r =>
                r.value === role)
            thisRole.num = parseInt(e.target.value)
            let shallowList = this.state.roles.filter(r =>
                r.value !== role)
            this.setState({
                roles: [...shallowList, thisRole]
            })
        }
    }

    updateAllowDuplicates = (e, role) =>{
        let thisRole = this.state.roles.find(r =>
            r.value === role)
        let shallowList = this.state.roles.filter(r =>
            r.value !== role)
        if (e.target.checked){
            thisRole.dups = true
        }
        else{
            thisRole.dups = false
        } 
        this.setState ({
            roles: [...shallowList, thisRole]
        })
    }

    createScheduleDraft = schedId => {
        let i, person
        let timeslotsObj = []

        const timeslots = this.context.timeslots.filter(resp =>
            resp.schedule_id = schedId)
        const roles = this.context.roles.filter(resp =>
            resp.schedule_id = schedId)
        const avail = this.context.avail.filter(a =>
            a.schedule_id === schedId)
        const people = this.context.people.filter(p =>
            avail.some(a => a.user_id === p.id) === true)
       
        timeslots.forEach(ts => {
            timeslotsObj.push({
                id: ts.ts_id,
                time: ts.timeslot,
                day: ts.day,
                roles: [],
                people: []
            })
        })
        
        let fullList = []

        for (i=0; i < timeslotsObj.length; i++){
            roles.forEach(r => 
                timeslotsObj[i].roles.push({
                    value: r.role,
                    num: avail.filter(a => a.timeslot === timeslotsObj[i].id &&
                        a.role === r.role).length 
                })
            )
            avail.filter(a => a.timeslot === timeslotsObj[i].id).forEach(a =>{
                person = people.find(p => a.user_id ===p.id)
                timeslotsObj[i].people.push({
                    firstName: person.firstName,
                    lastName: person.lastName,
                    email: person.email,
                    role: a.role
                })
                fullList.push(
                    {
                        day: timeslotsObj[i].day,
                        time: timeslotsObj[i].time,
                        name: person.firstName + " " + person.lastName,
                        role: a.role,
                    }
                )
            })
        }
        return {timeslotsObj, fullList}
    }

    createScheduleJSX = (draft) => {
        let tsobj = draft.timeslotsObj
        let peopleInRole = []
        let numRolesPerSlot = []
        let numSetsPerTS =[]

        let i, j, x
        let respNum, stateNum, slotsToAdd
        let enoughPeople = []
        let completeSched = []

        for (i=0; i < tsobj.length; i++){
            numRolesPerSlot = []
            this.state.roles.forEach(sr => {
                stateNum = this.state.roles.find(r => r.value === sr.value)
                respNum = tsobj[i].people.filter(p => p.role === sr.value).length 
                slotsToAdd = Math.floor(respNum/stateNum.num)
                numRolesPerSlot.push(slotsToAdd)
            })
            if (numRolesPerSlot.length> 0){
                numSetsPerTS.push(Math.min(...numRolesPerSlot))
            }
            
        }
        if (numSetsPerTS.length> 0){
            for (let item in tsobj){
                for (x=0; x < numSetsPerTS[item]; x++) {
                    this.state.roles.forEach(sr => {
                        peopleInRole = tsobj[item].people.filter(p => p.role === sr.value)
                        if (peopleInRole.length >= sr.num){
                            enoughPeople = true }
                        else {
                            enoughPeople = false
                        }
                    })
                    if (enoughPeople){
                        this.state.roles.forEach(sr => {
                            peopleInRole = tsobj[item].people.filter(p => p.role === sr.value)
                            for(j=0; j < sr.num; j++){
                                completeSched.push({
                                    day: tsobj[item].day,
                                    time: tsobj[item].time,
                                    name: peopleInRole[j].firstName + " " + peopleInRole[j].lastName,
                                    role: sr, 
                                    peopleInSlot: draft.timeslotsObj[item].people.filter(p => p.role === sr.value),
                                    ts_id: tsobj[item].id
                                })
                                tsobj[item].people = tsobj[item].people.filter(p => p.email !== peopleInRole[j].email)
                            }
                        })
                    }
                }
            
            } 
        }

        return completeSched
    }

    handleDropdownChange = (e, prevValue, completeSched, ts_id) =>{
        let targetObj = completeSched.find(item => 
            item.ts_id === ts_id && prevValue === item.name)
        let bystanderObj = completeSched.find(item => 
            item.ts_id === ts_id && e.target.value === item.name)

        let targetIndex = completeSched.indexOf(targetObj)
        let bystanderIndex = completeSched.indexOf(bystanderObj)
        if (bystanderObj.length === 0){
            completeSched[targetIndex] = {
                day: targetObj.day,
                name: e.target.value,
                peopleInSlot: targetObj.peopleInSlot,
                time: targetObj.time,
                ts_id: targetObj.ts_id
            }
        }
        else {
            completeSched[targetIndex] = bystanderObj
            completeSched[bystanderIndex] = targetObj
        }

        this.setState({
            completeSched: completeSched
        })
    }

    handleFinalizeClick = (e, callback, completeSched) => {
        e.preventDefault()
        const schedToSend = completeSched.map(entry => {
            return {
                schedule_id: this.props.match.params.schedId,
                name: entry.name,
                role: entry.role.value,
                ts_id: entry.ts_id
            }
        })
        callback(schedToSend)
    }

    componentDidMount() {
        const roles = this.context.roles.filter(resp =>
            resp.schedule_id = this.props.match.params.schedId)
        let rolesObj = []
        roles.forEach(r =>
            rolesObj.push({
                value: r.role,
                num: 1,
                dups: false
            }))
        this.setState({
            roles: [...rolesObj]
        })
    }

    render(){
        const schedId = this.props.match.params.schedId
        const draft = this.createScheduleDraft(schedId)
        let completeSched
        if (this.state.completeSched.length === 0){
            completeSched = this.createScheduleJSX(draft)
        }
        else{
            completeSched = this.state.completeSched
        }

        return(
            <div className='complete-schedule'>
                <div className="controls">
                    <p>How many people from each role do you want in one timeslot? Do you want people from one role to be on the schedule more than once?</p>
                    <ul>
                    {draft.timeslotsObj[0].roles.map(role =>
                            <li key={role.value}>
                                <label htmlFor={role.value}>{role.value}</label>
                                <input 
                                    className="num-roles" 
                                    name={role.value} 
                                    type="text" 
                                    defaultValue={1}
                                    onChange={e => this.updateRoleNum(e, role.value)}></input>
                                <label htmlFor="allow-duplicates">
                                    Allow duplicates
                                </label>
                                <input 
                                    name="allow-duplicates" 
                                    type="checkbox"
                                    onChange={e => this.updateAllowDuplicates(e, role.value)}>
                                </input>
                                <button>Apply</button>
                            </li>
                        )}
                    </ul>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {completeSched.map(entry =>
                        <tr>
                            <td>{entry.day}</td>
                            <td>{entry.time}</td>
                            <td><select
                                defaultValue={entry.name}
                                onChange={e => this.handleDropdownChange(e, entry.name, completeSched, entry.ts_id)}>
                                {entry.peopleInSlot.map(p =>
                                    <option>{p.firstName + " " + p.lastName}</option>
                                )} 
                            </select></td>
                            <td>{entry.role.value}</td>
                        </tr> )}

                    </tbody>
                </table>
                <button
                    onClick={e => this.handleFinalizeClick(e, this.context.addCompleteSched, completeSched)}>
                    Finalize for Sharing/Save Changes
                </button>   
            </div>
        )
    }
}

export default CompleteSched

//fix issue with rolesInSlot where the second slot only has the second perosn in the dropdwon
//allowduplicates?
