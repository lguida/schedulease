import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import SchedContent from './components/SchedContent/SchedContent'
import LoginPage from './components/LoginPage/LoginPage'
import NavLeft from './components/NavLeft/NavLeft'
import NavTop from './components/NavTop/NavTop'
import NewSched from './components/NewSched/NewSched'
import SchedList from './components/SchedList/SchedList'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Landing from './components/Landing/Landing'
import NewUser from './components/NewUser/NewUser'
import CompleteSharing from './components/CompleteSharing/CompleteSharing'
import AvailForm from './components/AvailForm/AvailForm'
import Submitted from './components/Submitted/Submitted'
import ErrorBound from './components/ErrorBound/ErrorBound'
import Banner from './components/Banner/Banner'

import authenticationService from './Auth/auth-service'
import { withRouter } from 'react-router-dom'

import config from './config'
import store from './store'
import ScheduleaseContext from './ScheduleaseContext'
import { PrivateRoute } from './Auth/PrivateRoute';

class App extends React.Component {
  state = {
    schedules: [],
    avail: [],
    people: [],
    roles: [],
    timeslots: [],
    complete: store.complete,
    currentUser: null,
    error: null,
  }

  setPeople = people => {
    this.setState({
      people: people,
      error: null
    })
  }

  setSchedules = schedules => {
    this.setState({
      schedules: schedules,
      error: null
    })
  }
  setRoles = roles => {
    this.setState({
        roles: roles,
        error: null
    })
  }

  setTimeslots = timeslots => {
    this.setState({
        timeslots:  timeslots,
        error: null
    })
  }

  setPeople = people => {
      this.setState({
          people: people,
          error: null
      })
  }

  setAvail = avail => {
      this.setState({
          avail: avail,
          error: null
      })
  }
  setComplete = complete => {
    this.setState({
        complete: complete,
        error: null
    })
}

  addSchedule = (schedule) => {
    this.setState({ 
      schedules: [...this.state.schedules, schedule],
    })
  }
  
  addRoles = (roles) => {
    this.setState({
      roles: [...this.state.roles, ...roles],
    })
  }

  addTimeslots = (timeslots) => {
    this.setState({ 
      timeslots: [...this.state.timeslots, ...timeslots]
    })
  }

  addPerson = person => {
    this.setState({
      people: [...this.state.people, person],
    })
  }

  addAvail = avail => {
    this.setState({
      avail: [...this.state.avail, ...avail]
    })
  }

  removeAvail = avail => {
    this.setState({
      avail: [...avail]
    })
  }

  editSchedule = (schedule) => {
    this.setState({
      schedules: [...this.state.schedules.filter(s => s.id !== schedule.id), schedule],
    })
  }
  
  //may need to add something for updating
  addCompleteSched = (completeSched) => {
    this.setState({
      complete: [...this.state.complete, ...completeSched]
    })
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

  componentDidMount() {
    this.setState({
      currentUser: localStorage.getItem('currentUser'),
    })

    fetch(`${config.API_ENDPOINT}/people/`, {
      method: 'GET',
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
    .then(this.setPeople)
    .catch(error => this.setState({ error }))
  
    if (localStorage.getItem('currentUser') !== null){
      fetch(`${config.API_ENDPOINT}/schedules`, {
        method: 'GET',
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
      .then(this.setSchedules)
      
      .catch(error => this.setState({ error }))
    
      fetch(`${config.API_ENDPOINT}/roles`, {
        method: 'GET',
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
      .then(this.setRoles)
      .catch(error => this.setState({ error }))

      fetch(`${config.API_ENDPOINT}/timeslots`, {
        method: 'GET',
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
      .then(this.setTimeslots)
      
      .catch(error => this.setState({ error }))

      fetch(`${config.API_ENDPOINT}/avail`, {
        method: 'GET',
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
      .then(this.setAvail)
      
      .catch(error => this.setState({ error }))

      fetch(`${config.API_ENDPOINT}/complete`, {
        method: 'GET',
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
      .then(this.setComplete)
      
      .catch(error => this.setState({ error }))
    }
  }

  
  logout() {
    authenticationService.logout();
      this.props.history.push('/login')
  }

  
  render(){
    const contextValue = {
      schedules: this.state.schedules,
      avail: this.state.avail,
      people: this.state.people,
      roles: this.state.roles,
      timeslots: this.state.timeslots,
      complete: this.state.complete,
      currentUser: this.state.currentUser,
      addSchedule: this.addSchedule,
      addRoles: this.addRoles,
      addPerson: this.addPerson,
      removeAvail: this.removeAvail,
      editSchedule: this.editSchedule,
      addTimeslots: this.addTimeslots,
      addAvail: this.addAvail,
      addCompleteSched: this.addCompleteSched,
      convertFloatHoursToMinutes: this.convertFloatHoursToMinutes,
      convertMinutesToFloat: this.convertMinutesToFloat,
    }
    return (
      <ScheduleaseContext.Provider value={contextValue}>
        <header>
        <ErrorBound>
          <Route path ='/dashboard/:option/:userId' component={NavTop} />
        </ErrorBound>
        <ErrorBound>
          <Route path ='/schedule/:option/:schedId' component={NavTop} />
        </ErrorBound>
        
        <ErrorBound>
          <Route path ='/login' component={Banner} /> 
        </ErrorBound>
        <ErrorBound>
          <Route path ='/new-user' component={Banner} /> 
        </ErrorBound>
        <ErrorBound>
          <Route path ='/complete-sharing/:schedId' component={Banner} /> 
        </ErrorBound>
        <ErrorBound>
          <Route path ='/avail-form/:schedId' component={Banner} /> 
        </ErrorBound>

        <ErrorBound>
          <Route path ='/' component={Banner} /> 
        </ErrorBound>

        </header>
        <main className='App'>
          <ErrorBound>
            <Route exact path='/' component={Landing}/>
          </ErrorBound>

          <ErrorBound>
          <Route exact path='/login' component={LoginPage}/>
            </ErrorBound>

          <ErrorBound>
            <Route path='/new-user' component={NewUser}/>
          </ErrorBound>
          
          <ErrorBound>
            <Route path='/complete-sharing/:schedId' component={CompleteSharing}/>
          </ErrorBound>

          <ErrorBound>
            <Route path='/avail-form/:schedId' component={AvailForm}/>
          </ErrorBound>

          <div className='group'>
            <ErrorBound>
              <PrivateRoute path ='/schedule/:option/:schedId' component={NavLeft} />
            </ErrorBound>
              
            <ErrorBound>
              <PrivateRoute path ='/schedule/:option/:schedId' component={SchedContent} />
            </ErrorBound>

            
          </div>

          <ErrorBound>
            <PrivateRoute path='/dashboard/new-schedule/:userId' component={NewSched} />
          </ErrorBound>

          <ErrorBound>
            <PrivateRoute path='/dashboard/schedule-list/:userId' component={SchedList} />
          </ErrorBound>

          <ErrorBound>
            <PrivateRoute path='/dashboard/home/:userId' component={Home} />
          </ErrorBound>

          <ErrorBound>
            <PrivateRoute path='/dashboard/profile/:userId' component={Profile} />
          </ErrorBound>

          <ErrorBound>
            <PrivateRoute path= '/submitted' component={Submitted} />
          </ErrorBound>

        
        </main>
      </ScheduleaseContext.Provider>
    );
  }
}

export default withRouter(App);