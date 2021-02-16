import React from 'react'
import ReactDOM from 'react-dom'
import NavTop from './NavTop'
import ErrorBound from '../ErrorBound/ErrorBound'


it('renders NavTop without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
            <NavTop/>
        </ErrorBound>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})