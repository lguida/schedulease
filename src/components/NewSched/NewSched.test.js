import React from 'react'
import ReactDOM from 'react-dom'
import NewSched from './NewSched'
import { withRouter } from 'react-router-dom'


it('renders NewSched without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        withRouter(<NewSched/>)
    , div)
    ReactDOM.unmountComponentAtNode(div)
})