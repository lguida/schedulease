import React from 'react'
import ReactDOM from 'react-dom'
import NewTimeslots from './NewTimeslots'


it('renders NewTimeslots without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <NewTimeslots/>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})