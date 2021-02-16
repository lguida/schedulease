import React from 'react'
import ReactDOM from 'react-dom'
import NavLeft from './NavLeft'


it('renders NavLeft without crashing', () =>{
    const div = document.createElement('div')
    ReactDOM.render(
        <NavLeft/>
    , div)
    ReactDOM.unmountComponentAtNode(div)
})