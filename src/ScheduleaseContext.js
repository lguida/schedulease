import React from 'react'

const ScheduleaseContext = React.createContext({
    schedules: [],
    avail: [],
    people: [],
    roles: [],
    timeslots: [],
    complete: [],
    currentUser: "",
    addSchedule: () => {},
    removeAvail: () =>{},
    addPerson: () => {},
    editSchedule: () => {},
    addRoles: () => {},
    addTimeslots: () => {},
    addAvail: () => {},
    addCompleteSched: () => {},
    convertFloatHoursToMinutes: () => {},
    convertMinutesToFloat: () => {},
})

export default ScheduleaseContext