import React from 'react'

const ScheduleaseContext = React.createContext({
    schedules: [],
    users: [],
    avail: [],
    people: [],
    roles: [],
    timeslots: [],
    completed: [],
    addSchedule: () => {},
    addAvail: () => {},
    addCompleteSched: () => {},
    convertFloatHoursToMinutes: () => {},
    convertMinutesToFloat: () => {},
})

export default ScheduleaseContext