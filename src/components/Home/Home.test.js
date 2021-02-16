import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home'
import ErrorBound from '../ErrorBound/ErrorBound'

it('renders Home without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
        <Home/>
    </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})