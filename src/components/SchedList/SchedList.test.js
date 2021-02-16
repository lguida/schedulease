import React from 'react'
import ReactDOM from 'react-dom'
import SchedList from './SchedList'
import ErrorBound from '../ErrorBound/ErrorBound'


it('renders SchedList without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
            <SchedList/>
        </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})