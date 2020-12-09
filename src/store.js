const store =  {
    "schedules": [
        {
            "id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "schedule_name": "My First Schedule",
            "status": "open",
            "responses": 5,
            "startDate:": new Date(),
            "endDate": new Date(),
            "meeting_duration": "30 minutes"
        },
        {
            "id": "67b73060-38c1-11eb-adc1-0242ac120002",
            "schedule_name": "End of year meetings",
            "status": "open",
            "responses": 3,
            "startDate:": new Date(),
            "endDate": new Date(),
            "meeting_duration": "1 hour"
        },
    ],
    "people": [
        {
            "id": "27ed36b6-38c4-11eb-adc1-0242ac120002",
            "email": "lguida@sas.upenn.edu",
            "account": true,
            "firstName": "Lucy",
            "lastName": "Guida",
            "username": "lguida",
            "password": "lucypass1200",
            "schedules": ["74a0636e-38c1-11eb-adc1-0242ac120002", "67b73060-38c1-11eb-adc1-0242ac120002"]
        },
        {
            "id": "46efe446-38c4-11eb-adc1-0242ac120002",
            "account": false,
            "email": "shomles@gmail.com",
            "firstName": "Sherlock",
            "lastName": "Holmes",
            "username": "",
            "password": "",
            "schedules": []
        },
        {
            "id": "3875b5dc-3985-11eb-adc1-0242ac120002",
            "account": false,
            "email": "mholmes@gmail.com",
            "firstName": "Mycroft",
            "lastName": "Holmes",
            "username": "",
            "password": "",
            "schedules": []
        },
        {
            "id": "e5a61e94-3986-11eb-adc1-0242ac120002",
            "account": false,
            "email": "glestrade@scotlandyard.com",
            "firstName": "Greg",
            "lastName": "Lestrade",
            "username": "",
            "password": "",
            "schedules": []
        }


    ],
    "avail": [
        {
            "timeslot": "01135610-38c4-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "27ed36b6-38c4-11eb-adc1-0242ac120002",
            "role": "Manager"
        },
        {
            "timeslot": "f5c13c00-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "27ed36b6-38c4-11eb-adc1-0242ac120002",
            "role": "Manager"
        },
        {
            "timeslot": "e912d144-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "27ed36b6-38c4-11eb-adc1-0242ac120002",
            "role": "Manager"
        },
        {
            "timeslot": "e912d144-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "46efe446-38c4-11eb-adc1-0242ac120002",
            "role": "Participant"
        },
        {
            "timeslot": "e912d144-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "3875b5dc-3985-11eb-adc1-0242ac120002",
            "role": "Participant"
        },
        {
            "timeslot": "f5c13c00-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "3875b5dc-3985-11eb-adc1-0242ac120002",
            "role": "Participant"
        },

        {
            "timeslot": "01135610-38c4-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "e5a61e94-3986-11eb-adc1-0242ac120002",
            "role": "Manager"
        },
        {
            "timeslot": "f5c13c00-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "e5a61e94-3986-11eb-adc1-0242ac120002",
            "role": "Manager"
        },
        {
            "timeslot": "e912d144-38c3-11eb-adc1-0242ac120002",
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "user_id": "e5a61e94-3986-11eb-adc1-0242ac120002",
            "role": "Manager"
        },
        
    ],
    "roles": [
        {
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "role": "Manager",
        },
        {
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "role": "Participant",
        },
    ],
    "timeslots": [
        {
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "ts_id": "e912d144-38c3-11eb-adc1-0242ac120002",
            "timeslot": "10:00 AM",
            "day": "Monday"
        },
        {
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "ts_id": "f5c13c00-38c3-11eb-adc1-0242ac120002",
            "timeslot": "11:00 AM",
            "day": "Monday"
        },
        {
            "schedule_id": "74a0636e-38c1-11eb-adc1-0242ac120002",
            "ts_id": "01135610-38c4-11eb-adc1-0242ac120002",
            "timeslot": "10:00 AM",
            "day": "Tuesday"
        },
    ],
    "complete": []
}
export default store