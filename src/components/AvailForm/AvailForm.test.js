import React from 'react'
import ReactDOM from 'react-dom'
import AvailForm from './AvailForm'
import { withRouter } from 'react-router-dom'

it('renders AvailForm without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(withRouter(<AvailForm/>), div)
    ReactDOM.unmountComponentAtNode(div)
})