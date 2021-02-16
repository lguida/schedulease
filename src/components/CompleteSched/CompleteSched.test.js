import React from 'react'
import ReactDOM from 'react-dom'
import CompleteSched from './CompleteSched'
import ErrorBound from '../ErrorBound/ErrorBound'
import ScheduleaseContext from '../../ScheduleaseContext'


it('renders CompleteSched without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
            <CompleteSched/>
        </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})