import React from 'react'
import './NewUser.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ScheduleaseContext from '../../ScheduleaseContext'
import config from '../../config'
 
class NewUser extends React.Component {
    static contextType = ScheduleaseContext
    constructor(props){
        super(props)
        this.state = {
            username: {
                value: '',
                touched: false },
            firstName: {
                value: '',
                touched: false },
            lastName: {
                value: '',
                touched: false },
            email: {
                value: '',
                touched: false },
            password: {
                value: '',
                touched: false },
            repeatPassword: {
                value: '',
                touched: false},
        }
    }

    updateUsername = (name) => {
        this.setState({ username: { value: name, touched: true} })
    }

    updateFirstName = (name) => {
        this.setState({ firstName: { value: name, touched: true} })
    }

    updateLastName = (name) => {
        this.setState({ lastName: { value: name, touched: true} })
    }

    updateEmail = (email) => {
        this.setState({ email: { value: email, touched: true} })
    }

    updatePassword = (password) => {
        this.setState({ password: { value: password, touched: true} })
    }

    updateRepeatPassword = (password) => {
        this.setState({ repeatPassword: { value: password, touched: true} })
    }

    validateEmail = () => {
        const existingemail = this.context.people.filter(user => user.email === this.state.email.value.trim())
        if (this.state.email.value.trim().length === 0){
            return "Enter your email"
        }
        else if (existingemail.length > 0 && existingemail[0].account === true){
            return "There is already an account associated with that email address"
        }
    }

    displayEmailWarning = () => {
        const message = this.validateEmail()
        if (message && this.state.email.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateFirstName = () => {
        if (this.state.firstName.value.trim().length === 0){   
            return "Enter your first name"
        }
    }

    displayFirstNameWarning = () => {
        const message = this.validateFirstName()
        if (message && this.state.firstName.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateLastName = () => {
        if (this.state.lastName.value.trim().length === 0){   
            return "Enter your last name"
        }
    }

    displayLastNameWarning = () => {
        const message = this.validateLastName()
        if (message && this.state.lastName.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateUsername = () => {
        const existingUsername = this.context.people.filter(user => user.username === this.state.username.value.trim())
        if (this.state.username.value.trim().length === 0){
            return "Enter a username"
        }
        else if (existingUsername.length > 0){
            return "That username is not available. Try a different one"
        }
    }

    displayUsernameWarning = () => {
        const message = this.validateUsername()
        if (message && this.state.username.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validatePassword = () =>{
        if (this.state.password.value.trim().length === 0){
            return "Enter a password"
        }
        else if (this.state.password.value.length <7){
            return "Password must be at least 8 characters"
        }
    }

    displayPasswordWarning = () => {
        const message = this.validatePassword()
        if (message && this.state.password.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }

    validateRepeatPassword = () => {
        if (this.state.repeatPassword.value.trim().length === 0){
            return "Renter your password"
        }
        else if (this.state.password.value !== this.state.repeatPassword.value){
            return "Passwords do not match"
        }
    }

    displayRepeatPasswordWarning = () => {
        const message = this.validateRepeatPassword()
        if (message && this.state.repeatPassword.touched === true){
            return "warning"
        }
        else{
            return "hidden"
        }
    }


    handleSubmit = (e, callback) => {
        e.preventDefault()
        const existingemail = this.context.people.filter(user => user.email === this.state.email.value.trim())
        if (existingemail.length > 0 && existingemail[0].account === false){
            const userToUpdate = {
                "account": true,
                "first_name": this.state.firstName.value,
                "last_name": this.state.lastName.value,
                "username": this.state.username.value,
                "password": this.state.password.value,
            }
            fetch(`${config.API_ENDPOINT}/people/id/${existingemail[0].id}`, {
                method: 'PATCH',
                body: JSON.stringify(userToUpdate),
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
            .then(data => {
                const newPerson = {
                    "id": data.id,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "email": data.email,
                    "account": data.account,
                    "username": data.username,
                    "password": data.password,
                }
                callback(newPerson, "add")
                this.props.history.push(`/dashboard/home/${data.id}`)
            })


            callback(userToUpdate, "update")
            this.props.history.push(`/dashboard/home/${existingemail[0].id}`)
        }
        else{
            const personToAdd = {
                "first_name": this.state.firstName.value,
                "last_name": this.state.lastName.value,
                "email": this.state.email.value,
                "account": true,
                "username": this.state.username.value,
                "password": this.state.password.value,
            }
            console.log(personToAdd)
    
            fetch(`${config.API_ENDPOINT}/people`, {
                method: 'POST',
                body: JSON.stringify(personToAdd),
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
            .then(data => {
                const newPerson = {
                    "id": data.id,
                    "first_name": this.state.firstName.value,
                    "last_name": this.state.lastName.value,
                    "email": this.state.email.value,
                    "account": true,
                    "username": this.state.username.value,
                    "password": this.state.password.value,
                }
                callback(newPerson, "add")
                this.props.history.push(`/dashboard/home/${data.id}`)
            })
        }
    }

    render(){
        return(
            <div className='new-user'>
                <form
                    onSubmit={e=> this.handleSubmit(e, this.context.addPerson)}>
                    <label htmlFor='new-username'>New Username:</label>
                    <input 
                        type='text' 
                        name='new-username'
                        onChange={e=> this.updateUsername(e.target.value)}/>
                    <span className={this.displayUsernameWarning()}>{this.validateUsername()}</span> 
                    <br/>
                    <label htmlFor='new-email'>Email Address:</label>
                    <input 
                        type='text' 
                        name='new-email'
                        onChange={e=> this.updateEmail(e.target.value)}/>
                    <span className={this.displayEmailWarning()}>{this.validateEmail()}</span> 
                    <br/>
                    <label htmlFor='new-firstname'>First Name:</label>
                    <input 
                        type='text' 
                        name='new-firstname'
                        onChange={e=> this.updateFirstName(e.target.value)}/>
                    <span className={this.displayFirstNameWarning()}>{this.validateFirstName()}</span>
                    <br/>
                    <label htmlFor='new-lastname'>Last Name:</label>
                    <input 
                        type='text' 
                        name='new-lastname'
                        onChange={e=> this.updateLastName(e.target.value)}/>
                    <span className={this.displayLastNameWarning()}>{this.validateLastName()}</span>
                    <br/>
                    <label htmlFor='password-one'>Password:</label>
                    <input 
                        type='password' 
                        name='password-one'
                        onChange={e=> this.updatePassword(e.target.value)}/>
                    <span className={this.displayPasswordWarning()}>{this.validatePassword()}</span> 
                    <br/>
                    <label htmlFor='password-two'>Re-enter Password:</label>
                    <input 
                        type='password' 
                        name='password-two'
                        onChange={e=> this.updateRepeatPassword(e.target.value)}/>
                    <span className={this.displayRepeatPasswordWarning()}>{this.validateRepeatPassword()}</span> 
                    <br/>
                    <button 
                        type='submit'
                        disabled={
                            this.validateUsername() ||
                            this.validateEmail() ||
                            this.validateFirstName() ||
                            this.validateLastName() ||
                            this.validatePassword() ||
                            this.validateRepeatPassword()
                        }>Create User</button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewUser)

NewUser.propTypes = {
    history: PropTypes.object.isRequired
}