import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Responses from './components/Responses/Responses'
import LoginPage from './components/LoginPage/LoginPage'
import NavLeft from './components/NavLeft/NavLeft'
import NavTop from './components/NavTop/NavTop'
import SchedSet from './components/SchedSet/SchedSet'
import CompleteSched from './components/CompleteSched/CompleteSched'
import NewSched from './components/NewSched/NewSched'
import SchedList from './components/SchedList/SchedList'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Landing from './components/Landing/Landing'
import NewUser from './components/NewUser/NewUser'
import CompleteSharing from './components/CompleteSharing/CompleteSharing'
import AvailFrom from './components/AvailForm/AvailForm'
import store from './store'
import ScheduleaseContext from './ScheduleaseContext'

class App extends React.Component {
  state = {
    schedules: store.schedules,
    users: store.users,
    avail: store.avail,
    people: store.people,
    roles: store.roles,
    timeslots: store.timeslots,
    complete: store.complete,
  }

  addSchedule = (schedule, roles, timeslots) => {
    this.setState({
      schedules: [...this.state.schedules, schedule],
      roles: [...this.state.roles, ...roles],
      timeslots: [...this.state.timeslots, ...timeslots]
    })
  }

  addAvail = (person, avail) => {
    if (person === "none"){
      this.setState({
        avail: [...this.state.avail, ...avail],
      })
    }
    else{
      this.setState({
        avail: [...this.state.avail, ...avail],
        people: [...this.state.people, person],
      })
    }
  }
  
  //may need to add something for updating
  addCompleteSched = (completeSched) => {
    this.setState({
      complete: [...this.state.complete, ...completeSched]
    })
  }

  addNewUser = (newUser, edit) => {
    if (edit === "update"){
      const newPeopleList = this.state.people.filter(entry => entry.email !== newUser.email)
      console.log(newPeopleList)
      this.setState({
        people: [...newPeopleList, newUser]
      })
    }
    else if (edit === "add"){
      this.setState({
        people: [...this.state.people, newUser]
      })
    }
  }

  convertFloatHoursToMinutes = (toConvert) => {
    const newFloat = parseFloat(toConvert) - parseInt(toConvert)
    let newMin
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
    return {
      hour: parseInt(toConvert),
      min: newMin
    }
  }
  
  convertMinutesToFloat = (hour, minute) => {
    let newFloat
    if (minute === 0){
      newFloat = 0
    }
    else if (minute === 15){
      newFloat = .25
    }
    else if (minute === 30){
        newFloat = .5
    }
    else{
        newFloat = .75
    }
    const final = parseFloat(hour) + newFloat
    return final
  }

  render(){
    const contextValue = {
      schedules: this.state.schedules,
      user: this.state.users,
      avail: this.state.avail,
      people: this.state.people,
      roles: this.state.roles,
      timeslots: this.state.timeslots,
      complete: this.state.complete,
      addSchedule: this.addSchedule,
      addAvail: this.addAvail,
      addCompleteSched: this.addCompleteSched,
      addNewUser: this.addNewUser,
      convertFloatHoursToMinutes: this.convertFloatHoursToMinutes,
      convertMinutesToFloat: this.convertMinutesToFloat,
    }
    return (
      <ScheduleaseContext.Provider value={contextValue}>
        <header>
          <Route path ='/dashboard/:option/:userId' component={NavTop} />
        </header>
        <main className='App'>
        
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/new-user' component={NewUser}/>

          <Route path='/complete-schedule/:schedId' component={CompleteSharing}/>
          <Route path='/avail-form/:schedId' component={AvailFrom}/>

          <div className='group'>
            <Route path ='/dashboard/schedule-settings/:schedId' component={NavLeft} />
            <Route exact path='/dashboard/schedule-settings/:schedId' component={SchedSet}/>

            <Route path ='/dashboard/completed-schedule/:schedId' component={NavLeft} />
            <Route exact path='/dashboard/completed-schedule/:schedId' component={CompleteSched}/>
            
            <Route path ='/dashboard/responses/:schedId' component={NavLeft} />
            <Route exact path='/dashboard/responses/:schedId' component={Responses}/>
          </div>
          <Route path='/dashboard/new-schedule/:userId' component={NewSched} />
          <Route path='/dashboard/schedule-list/:userId' component={SchedList} />
          <Route path='/dashboard/home/:userId' component={Home} />
          <Route path='/dashboard/profile/:userId' component={Profile} />

        
        </main>
      </ScheduleaseContext.Provider>
    );
  }
}

export default App;