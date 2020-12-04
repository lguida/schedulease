const store =  {
    "schedules": [
        {
            "id": 1,
            "schedule_name": "My First Schedule",
            "status": "open",
            "deadline": "Dec 5th, 2020",
            "responses": 5,
            "roles": ["Moderator", "Participant"],
            "timeslots": ["9:00AM", "9:30AM", "10:00AM","10:30AM"],
            "startTimeframe:": {
                "hour": 9,
                "ampm": "AM"},
            "endTimeframe": {
                "hour": 5, 
                "ampm": "PM"},
            "meeting_duration": "30 minutes"
        },
        {
            "id": 2,
            "schedule_name": "End of year meetings",
            "status": "open",
            "deadline": "Dec 20th, 2020",
            "responses": 3,
            "roles": ["Manager", "Employee"],
            "timeslots": ["12:00PM", "1:00PM", "2:00PM"],
            "startTimeframe:": {
                "hour": 9,
                "ampm": "AM"},
            "endTimeframe": {
                "hour": 5, 
                "ampm": "PM"},
            "meeting_duration": "1 hour"
        }
    ],
    "users": [
        {
            "id": 1,
            "username": "lguida",
            "email": "lguida@sas.upenn.edu",
            "password": "lucypass1200",
            "schedules": [1, 2]
        }

    ],
    "people":[
        {
            "email": "shomles@gmail.com",
            "firstName": "Sherlock",
            "lastName": "Holmes",
        }
    ],
    "avail": [
        {
            "role": "Participant",
            "timeslot": "9:00AM",
            "scheduleId": 1,
            "personId": "shomles@gmail.com",
        },
        {
            "role": "Participant",
            "timeslot": "10:00AM",
            "scheduleId": 1,
            "personId": "shomles@gmail.com",
        }
    ],
    "availResponses": [
        {
            "id": 2,
            "firstName": "Mycroft",
            "lastName": "Holmes",
            "email": "myhomles@gmail.com",
            "role": "Participant",
            "timeslots": ["9:30AM", "10:00AM", "10:30AM"],
            "scheduleId": 1
        },
        {
            "id": 3,
            "firstName": "Greg",
            "lastName": "Lestrade",
            "email": "greglest@gmail.com",
            "role": "Participant",
            "timeslots": ["9:30AM", "10:00AM", "10:30AM"],
            "scheduleId": 1
        },
        {
            "id": 4,
            "firstName": "James",
            "lastName": "Moriarty",
            "email": "jmoriarty@gmail.com",
            "role": "Participant",
            "timeslots": ["9:00AM", "9:30AM",  "10:30AM"],
            "scheduleId": 1
        },
        {
            "id": 5,
            "firstName": "Arthur",
            "lastName": "Conan Doyle",
            "email": "acdoyle@gmail.com",
            "role": "Moderator",
            "timeslots": ["9:00AM", "9:30AM",  "10:00AM", "10:30AM"],
            "scheduleId": 1
        },
    ]
}
export default store