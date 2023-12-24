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

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```
Response:

201: User registered successfully
500: Internal Server Error


## User Login

Endpoint: `POST /login`

Log in an existing user.

```json
{
  "email": "john_doe@example.com",
  "password": "securePassword123"
}
```

Response:

200: Login successful
401: Invalid credentials
500: Internal Server Error


## User Events

Endpoint: `POST /events`

Create a new event.

```json
{
  "eventName": "Tech Conference 2023",
  "date": "2023-12-31T08:00:00Z",
  "location": "Convention Center",
  "description": "A conference on the latest technology trends."
}
```

Response:

201: Event created successfully
500: Internal Server Error



## Get Events

Endpoint: `POST /events`

Get a list of all events.

```json
[
  {
    "eventName": "Tech Conference 2023",
    "date": "2023-12-31T08:00:00Z",
    "location": "Convention Center",
    "description": "A conference on the latest technology trends."
  },
  // ... other events
]
```

Response:

200: Event found
500: Internal Server Error


## Update Event

Endpoint: PUT /events/{eventId}

Update an existing event.

```json
{
  "eventName": "Updated Tech Conference 2023",
  "date": "2023-12-31T09:00:00Z",
  "location": "New Convention Center",
  "description": "An updated conference on the latest technology trends."
}
```
Response:

200: Successful response

```json
[
  {
    "eventName": "Tech Conference 2023",
    "date": "2023-12-31T08:00:00Z",
    "location": "Convention Center",
    "description": "A conference on the latest technology trends."
  },
  // ... other events
]
```
500: Internal Server Error


## Update Event
Endpoint: PUT /events/{eventId}

Update an existing event.

```json
{
  "eventName": "Updated Tech Conference 2023",
  "date": "2023-12-31T09:00:00Z",
  "location": "New Convention Center",
  "description": "An updated conference on the latest technology trends."
}
```
Response:

200: Successful response

```json
{
  "eventName": "Updated Tech Conference 2023",
  "date": "2023-12-31T09:00:00Z",
  "location": "New Convention Center",
  "description": "An updated conference on the latest technology trends."
}
```
500: Internal Server Error


## Delete Event

Endpoint: DELETE /events/{eventId}

Delete an event.

Response:

200: Event deleted successfully
500: Internal Server Error


```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}



{
  "eventName": "Tech Conference 2023",
  "date": "2023-12-31T08:00:00Z",
  "location": "Convention Center",
  "description": "A conference on the latest technology trends."
}
```