import React from 'react'

const ScheduleaseContext = React.createContext({
    schedules: [],
    users: [],
    availResponses: [],
    avail: [],
    people: [],
    addSchedule: () => {},
    addAvail: () => {},
})

export default ScheduleaseContext