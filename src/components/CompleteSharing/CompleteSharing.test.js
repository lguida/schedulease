import React from 'react'
import ReactDOM from 'react-dom'
import CompleteSharing from './CompleteSharing'
import Enzyme, { shallow, mount } from 'enzyme'
import { makeSchedulesArray, makeCompleteArray, makeTimeslotsArray } from '../../testing-fixtures'


const getComponentWithContext = (context = {schedules: makeSchedulesArray(),
    complete: makeCompleteArray(),
    timeslots: makeTimeslotsArray()
}) => {
  
    // Will then mock the LocalizeContext module being used in our LanguageSelector component
    jest.doMock('./ScheduleaseContext', () => {
      return {
        ScheduleaseContext: {
          Consumer: (props) => props.children(context)
        }
      }
    });
    
    // you need to re-require after calling jest.doMock.
    // return the updated LanguageSelector module that now includes the mocked context
    return require('./CompleteSharing').CompleteSharing;
};

it('renders CompleteSharing without crashing', () =>{
    //const context = {
      //  schedules: makeSchedulesArray(),
        //complete: makeCompleteArray(),
        //timeslots: makeTimeslotsArray()
    //}
    const TestComp = getComponentWithContext()
    const wrapper = mount(shallow(
        <TestComp
          required={true}
          match={{params: {id: 1}, isExact: true, path: "", url: ""}}

        />
      ));
    //wrapper.setContext(context)
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
    ReactDOM.unmountComponentAtNode(div)
})