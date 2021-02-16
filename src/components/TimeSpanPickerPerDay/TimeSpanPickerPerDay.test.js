import React from 'react'
import ReactDOM from 'react-dom'
import TimeSpanPickerPerDay from './TimeSpanPickerPerDay'


it('renders TimeSpanPickerPerDay without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <TimeSpanPickerPerDay/>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})