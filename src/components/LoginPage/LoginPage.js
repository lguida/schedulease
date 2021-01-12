import React from 'react'
import './LoginPage.css'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ScheduleaseContext from '../../ScheduleaseContext'
import authenticationService from '../../Auth/auth-service'
 
class LoginPage extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)

        if (authenticationService.currentUserValue) { 
            this.props.history.push(`/dashboard/home/${authenticationService.currentUserValue}`) 
        }
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
        authenticationService.login(this.state.username, this.state.password)
            .then(user =>
                {console.log(user)
                    this.props.history.push(`/dashboard/home/${user[0].id}`)},
                error => {
                    this.setState({
                        noMatch: true
                    })
                })
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
                    <label>Username:</label>
                    <input 
                        type='text' 
                        name='login-username'
                        onChange={e => this.updateUsername(e)}/>
                    <br />
                    <label>Password</label>
                    <input 
                        type='password' 
                        name='login-password'
                        onChange={e => this.updatePassword(e)}/>
                    <br/>
                    <button type='submit'>Login</button>
                    <br />
                    <span className={this.displayReject()}>Username and password combo do not match our records</span>
                    <p>or</p>
                    <Link to={`/new-user`}><button>Create Account</button></Link>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage)

LoginPage.propTypes = {
    history: PropTypes.object.isRequired
}