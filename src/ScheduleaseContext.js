import React from 'react'

const ScheduleaseContext = React.createContext({
    schedules: [],
    users: [],
    availResponses: [],
    addSchedule: () => {},
    addAvail: () => {},
})

export default ScheduleaseContext