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
    availResponses: store.availResponses,
  }

  addSchedule = schedule => {
    this.setState({
      schedules: [...this.state.schedules, schedule]
    })
  }

  addAvail = avail => {
    this.setState({
      availResponses: [...this.state.availResponses, avail]
    })
  }

  render(){
    const contextValue = {
      schedules: this.state.schedules,
      user: this.state.users,
      availResponses: this.state.availResponses,
      addSchedule: this.addSchedule,
      addAvail: this.addAvail,
    }
    return (
      <>
      <header>
        <Route path ='/dashboard' component={NavTop} />
      </header>
      <main className='App'>
      <ScheduleaseContext.Provider value={contextValue}>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/login' component={LoginPage}/>
        <Route exact path='/new-user' component={NewUser}/>

        <Route path='/complete-schedule' component={CompleteSharing}/>
        <Route path='/avail-form/:schedId' component={AvailFrom}/>

        <div className='group'>
          <Route path ='/dashboard/schedule-settings/:schedId' component={NavLeft} />
          <Route exact path='/dashboard/schedule-settings/:schedId' component={SchedSet}/>

          <Route path ='/dashboard/completed-schedule/:schedId' component={NavLeft} />
          <Route exact path='/dashboard/completed-schedule/:schedId' component={CompleteSched}/>
          
          <Route path ='/dashboard/responses/:schedId' component={NavLeft} />
          <Route exact path='/dashboard/responses/:schedId' component={Responses}/>
        </div>
        <Route path='/dashboard/new-schedule' component={NewSched} />
        <Route path='/dashboard/schedule-list' component={SchedList} />
        <Route path='/dashboard/home' component={Home} />
        <Route path='/dashboard/profile' component={Profile} />

      </ScheduleaseContext.Provider>
      </main>
      </>
    );
  }
}

export default App;