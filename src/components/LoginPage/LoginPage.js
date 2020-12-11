import React from 'react'
import './LoginPage.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ScheduleaseContext from '../../ScheduleaseContext'
 
class LoginPage extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            noMatch: false,
        }
    }

    updateUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    updatePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    validateUser = (e) =>{
        e.preventDefault()
        const userRecord = this.context.people.find(p => p.username === this.state.username)
        const emailRecord = this.context.people.find(p => p.email === this.state.username)
        let recordToUse
        if (userRecord === undefined){
            recordToUse = emailRecord
        }
        else if (emailRecord === undefined){
            recordToUse = userRecord
        }
        if (this.state.password === recordToUse.password){
            this.props.history.push(`/dashboard/home/${recordToUse.id}`)
        }
        else {
            this.setState({
                noMatch: true
            })
        }
    }

    displayReject = () => {
        if (this.state.noMatch === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }


    render(){
        return(
            <div className='login-page'>
                <form
                    onSubmit={e => this.validateUser(e)}>
                    <label htmlFor='login-email'>Email:</label>
                    <input 
                        type='text' 
                        name='login-username'
                        onChange={e => this.updateUsername(e)}/>
                    <br />
                    <label htmlFor='login-password'>Password</label>
                    <input 
                        type='password' 
                        name='login-password'
                        onChange={e => this.updatePassword(e)}/>
                    <br/>
                    <button type='submit'>Login</button>
                    <br />
                    <span className={this.displayReject()}>Username and password combo do not match our records</span>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage)

LoginPage.propTypes = {
    history: PropTypes.object.isRequired
}