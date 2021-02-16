import React from 'react'
import ReactDOM from 'react-dom'
import Submitted from './Submitted'


it('renders Submitted without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <Submitted/>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})