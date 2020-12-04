import React from 'react'
import './CompleteSched.css'
import ScheduleaseContext from '../../ScheduleaseContext'


class CompleteSched extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            roles: [],
            roleNums: [],
            roleDups: [],
            timeslots: [],
            tsTotals: [],
        }
    }

    updateRoleNum = (e, role) => {
        if (e.target.value !==""){
            const index = this.state.roles.indexOf(role)
            let oldList = this.state.roleNums
            oldList[index] = parseInt(e.target.value)
            console.log(oldList)
            this.setState({
                roleNums: oldList
            })
        }
    }

    updateAllowDuplicates = (e, role) =>{
        const index = this.state.roles.indexOf(role)
        let dupList = this.state.roleDups
        if (e.target.checked){
            dupList[index] = true
            
        }
        else{
           dupList[index] = false
        } 
        console.log(dupList)
        this.setState ({
            roleDups: dupList
        })
    }

    createScheduleDraft = schedule => {
        const responses = this.context.availResponses.filter(resp =>
            resp.scheduleId = schedule.id)
        //const roles = schedule.roles
        let list = []
        let i, j, id = 0
        let tsList = []
        for (i=0; i < schedule.timeslots.length; i++){
            tsList.push({
                "value": schedule.timeslots[i],
                "responseIds": []
            })
        }
        // for (i=0; i < schedule.timeslots.length; i++){
        //     for (j=0; j <responses.length; j++){
        //         if (responses[j])
        //     }
        // }
        
        for (i=0; i < responses.length; i++){ //goes through responses
            for (j=0; j <responses[i].timeslots.length; j++){ //goes through timeslots
                list.push(
                    {
                        "id": id,
                        "timeslot": responses[i].timeslots[j],
                        "firstName": responses[i].firstName,
                        "lastName": responses[i].lastName,
                        "email": responses[i].email,
                        "role": responses[i].role,
                        "show": true, //probably default this to false
                    }
                )
                if (responses[i].timeslots[j] === tsList[j].value){
                    tsList[j].responseIds.push(responses[i].id)
                }
                
                id += 1
            }
        }
        console.log(tsList)


        list.sort((a, b) => {
            var nameA = a.timeslot.toUpperCase(); // ignore upper and lowercase
            var nameB = b.timeslot.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
        return list
    }
    
    componentDidMount(){
        const schedId = parseInt(this.props.match.params.schedId)
        const schedule = this.context.schedules.find(s =>
            s.id === schedId)
        let roleNums = []
        let roleDups = []
        for (let i=0; i< schedule.roles.length; i++){
            roleNums.push(1)
            roleDups.push(false)
        }
        this.setState({
            roles: schedule.roles,
            roleNums: roleNums,
            roleDups: roleDups,
            //timeslots: schedule.timeslots
        })
    }

    render(){
        const schedId = parseInt(this.props.match.params.schedId)
        const schedule = this.context.schedules.find(s =>
            s.id === schedId)
        const draft = this.createScheduleDraft(schedule)
        return(
            <div className='complete-schedule'>
                <div className="controls">
                    <p>How many people from each role do you want in one timeslot? Do you want people from one role to be on the schedule more than once?</p>
                    <ul>
                        {schedule.roles.map(role =>
                            <li key={role}>
                                <label htmlFor={role}>{role}</label>
                                <input 
                                    className="num-roles" 
                                    name={role} 
                                    type="text" 
                                    defaultValue={1}
                                    onChange={e => this.updateRoleNum(e, role)}></input>
                                <label htmlFor="allow-duplicates">
                                    Allow duplicates
                                </label>
                                <input 
                                    name="allow-duplicates" 
                                    type="checkbox"
                                    onChange={e => this.updateAllowDuplicates(e, role)}>
                                </input>
                                <button>Apply</button>
                            </li>
                        )}
                    </ul>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {draft.map(entry =>
                            <tr key={entry.id}>
                                <td>{entry.timeslot}</td>
                                <td>{entry.firstName}{entry.lastName}</td>
                                <td>{entry.email}</td>
                                <td>{entry.role}</td>
                            </tr> 
                        )}
                    </tbody>
                </table>   
            </div>
        )
    }
}

export default CompleteSched