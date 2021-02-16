import React from 'react'
import ReactDOM from 'react-dom'
import SchedContent from './SchedContent'
import ErrorBound from '../ErrorBound/ErrorBound'


it('renders SchedContent without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
            <SchedContent/>
        </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})