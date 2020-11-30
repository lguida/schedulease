import React from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
 
class LoginPage extends React.Component {
    render(){
        return(
            <div className='login-page'>
                <form>
                    <label htmlFor='login-email'>Email:</label>
                    <input name='login-username'/>
                    <br />
                    <label htmlFor='login-password'>Password</label>
                    <input name='login-password'/>
                    <br/>
                    <Link to={`/dashboard/home`}><button type='submit'>Login</button></Link>
                </form>
            </div>
        )
    }
}

export default LoginPage