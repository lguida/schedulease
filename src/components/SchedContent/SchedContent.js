import React from 'react'
import './SchedContent.css'
import ScheduleaseContext from '../../ScheduleaseContext'
import { PrivateRoute } from '../../Auth/PrivateRoute'
import SchedSet from '../SchedSet/SchedSet'
import CompleteSched from '../CompleteSched/CompleteSched'
import Responses from '../Responses/Responses'
import config from '../../config'
 
class SchedContent extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            error: null,
          }
    }

    componentDidMount() {
        const currentSchedule = this.context.schedules.find(s => 
            s.id === parseInt(this.props.match.params.schedId))
        console.log(currentSchedule, this.context.schedules, this.props.match.params.schedId)
        this.setState({
          currentUser: localStorage.getItem('currentUser'),
          schedule: currentSchedule
        })
    }

    render(){
        console.log(this.state.schedule)
        return(
            <>
                <PrivateRoute  path='/schedule/schedule-settings/:schedId' component={SchedSet}/>
                <PrivateRoute  path='/schedule/completed-schedule/:schedId' component={CompleteSched}/>
                <PrivateRoute  path='/schedule/responses/:schedId' component={Responses}/>
            </>
        )
    }
}

export default SchedContent