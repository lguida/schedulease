import React from 'react'
import './CompleteSched.css'
import ScheduleaseContext from '../../ScheduleaseContext'
import config from '../../config'


class CompleteSched extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            roles: [],
            completeSched: [],
            finalize: "hidden"
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
            resp.schedule_id === parseInt(schedId))
        const roles = this.context.roles.filter(resp =>
            resp.schedule_id === parseInt(schedId))
        const avail = this.context.avail.filter(a =>
            a.schedule_id === parseInt(schedId))
        const people = this.context.people.filter(p =>
            avail.some(a => a.people_id === p.id) === true)
        
        timeslots.forEach(ts => {
            timeslotsObj.push({
                id: ts.id,
                time: ts.timeslot,
                day: ts.day_name,
                roles: [],
                people: []
            })
        })
        
        let fullList = []
        for (i=0; i < timeslotsObj.length; i++){
            roles.forEach(r => 
                timeslotsObj[i].roles.push({
                    value: r.role_name,
                    num: avail.filter(a => a.timeslot === timeslotsObj[i] &&
                        a.role_name === r.role_name).length 
                })
            )
            avail.filter(a => a.timeslot === timeslotsObj[i].id).forEach(a =>{
                person = people.find(p => a.people_id === p.id)
                timeslotsObj[i].people.push({
                    first_name: person.first_name,
                    last_name: person.last_name,
                    email: person.email,
                    role: a.role_name
                })
                fullList.push(
                    {
                        day: timeslotsObj[i].day,
                        time: timeslotsObj[i].time,
                        name: person.first_name + " " + person.last_name,
                        role: a.role_name,
                    }
                )
            })
        }
        
        return {timeslotsObj, fullList}
    }

    createScheduleJSX = (draft) => {
        let tsobj = JSON.parse(JSON.stringify(draft.timeslotsObj))
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
                                    name: peopleInRole[j].first_name + " " + peopleInRole[j].last_name,
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
                "schedule_id": parseInt(this.props.match.params.schedId),
                "people_name": entry.name,
                "role_name": entry.role.value,
                "timeslot": entry.ts_id
            }
        })

        fetch(`${config.API_ENDPOINT}/complete`, {
            method: 'POST',
            body: JSON.stringify(schedToSend),
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
                let addEntriesToList = []
                data.map(data => {
                    addEntriesToList.push({
                        "id": data.id,
                        "schedule_id": data.schedule_id,
                        "people_name": data.people_name,
                        "role_name": data.role_name,
                        "timeslot": data.timeslot
                    })
                })
                this.setState({
                    finalize: "green"
                })
                callback(addEntriesToList)
        })
    }

    componentDidMount() {
        const roles = this.context.roles.filter(resp =>
            resp.schedule_id === parseInt(this.props.match.params.schedId))
        let rolesObj = []
        roles.forEach(r =>
            rolesObj.push({
                value: r.role_name,
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
        if (draft && completeSched.length !== 0){
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
                                        <option>{p.first_name + " " + p.last_name}</option>
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
                    <span className={this.state.finalize}>Your changes have been saved.</span> 
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

export default CompleteSched


//allowduplicates?
