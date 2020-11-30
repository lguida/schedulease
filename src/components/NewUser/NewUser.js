import React from 'react'
import './NewUser.css'
import { Link } from 'react-router-dom'
 
class NewUser extends React.Component {
    render(){
        return(
            <div className='new-user'>
                <form>
                    <label htmlFor='new-username'>New Username:</label>
                    <input type='text' name='new-username'/>

                    <label htmlFor='new-email'>Email Address:</label>
                    <input type='text' name='new-email'/>

                    <label htmlFor='password-one'>Password:</label>
                    <input type='text' name='password-one'/>

                    <label htmlFor='password-two'>Re-enter Password:</label>
                    <input type='text' name='password-two'/>

                    <Link to={'/dashboard/home'}><button type='submit'>Create User</button></Link>
                </form>
            </div>
        )
    }
}

export default NewUser