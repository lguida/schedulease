import React from 'react'
import ReactDOM from 'react-dom'
import Profile from './Profile'
import ErrorBound from '../ErrorBound/ErrorBound'

it('renders Profile without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
        <Profile/>
    </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})