import React from 'react'
import ReactDOM from 'react-dom'
import SchedSet from './SchedSet'
import ErrorBound from '../ErrorBound/ErrorBound'


it('renders SchedSet without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <ErrorBound>
            <SchedSet/>
        </ErrorBound>, div)
    ReactDOM.unmountComponentAtNode(div)
})