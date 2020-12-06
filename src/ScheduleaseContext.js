import React from 'react'

const ScheduleaseContext = React.createContext({
    schedules: [],
    users: [],
    availResponses: [],
    avail: [],
    people: [],
    roles: [],
    timeslots: [],
    completed: [],
    addSchedule: () => {},
    addAvail: () => {},
    convertFloatHoursToMinutes: () => {},
    convertMinutesToFloat: () => {},
})

export default ScheduleaseContext