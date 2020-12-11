import React from 'react'

const ScheduleaseContext = React.createContext({
    schedules: [],
    users: [],
    avail: [],
    people: [],
    roles: [],
    timeslots: [],
    complete: [],
    addSchedule: () => {},
    addAvail: () => {},
    addCompleteSched: () => {},
    addNewUser: () => {},
    convertFloatHoursToMinutes: () => {},
    convertMinutesToFloat: () => {},
})

export default ScheduleaseContext