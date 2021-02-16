import React from 'react'
import ReactDOM from 'react-dom'
import Responses from './Responses'
import ErrorBound from '../ErrorBound/ErrorBound'

it('renders Responses without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
        <Responses/>
    </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})