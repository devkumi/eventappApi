# Event Management API

API for managing users and events in an event management application.

## Table of Contents

- [User Registration](#user-registration)
- [User Login](#user-login)
- [Create Event](#create-event)
- [Get Events](#get-events)
- [Update Event](#update-event)
- [Delete Event](#delete-event)

## User Registration

Endpoint: `POST /register`

Register a new user.


{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}

Response:

201: User registered successfully
500: Internal Server Error


## User Login

Endpoint: `POST /login`

Log in an existing user.


{
  "email": "john_doe@example.com",
  "password": "securePassword123"
}


Response:

200: Login successful
401: Invalid credentials
500: Internal Server Error


## User Events

Endpoint: `POST /events`

Create a new event.


{
  "eventName": "Tech Conference 2023",
  "date": "2023-12-31T08:00:00Z",
  "location": "Convention Center",
  "description": "A conference on the latest technology trends."
}


Response:

201: Event created successfully
500: Internal Server Error



## Get Events

Endpoint: `POST /events`

Get a list of all events.


[
  {
    "eventName": "Tech Conference 2023",
    "date": "2023-12-31T08:00:00Z",
    "location": "Convention Center",
    "description": "A conference on the latest technology trends."
  },
  // ... other events
]


Response:

200: Event found
500: Internal Server Error


## Update Event

Endpoint: PUT /events/{eventId}

Update an existing event.


{
  "eventName": "Updated Tech Conference 2023",
  "date": "2023-12-31T09:00:00Z",
  "location": "New Convention Center",
  "description": "An updated conference on the latest technology trends."
}

Response:

200: Successful response
[
  {
    "eventName": "Tech Conference 2023",
    "date": "2023-12-31T08:00:00Z",
    "location": "Convention Center",
    "description": "A conference on the latest technology trends."
  },
  // ... other events
]

500: Internal Server Error


## Update Event
Endpoint: PUT /events/{eventId}

Update an existing event.


{
  "eventName": "Updated Tech Conference 2023",
  "date": "2023-12-31T09:00:00Z",
  "location": "New Convention Center",
  "description": "An updated conference on the latest technology trends."
}

Response:

200: Successful response


{
  "eventName": "Updated Tech Conference 2023",
  "date": "2023-12-31T09:00:00Z",
  "location": "New Convention Center",
  "description": "An updated conference on the latest technology trends."
}

500: Internal Server Error


## Delete Event

Endpoint: DELETE /events/{eventId}

Delete an event.

Response:

200: Event deleted successfully
500: Internal Server Error

Schemas

{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}

``json

{
  "eventName": "Tech Conference 2023",
  "date": "2023-12-31T08:00:00Z",
  "location": "Convention Center",
  "description": "A conference on the latest technology trends."
}