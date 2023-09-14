# Travelo (Travel Itinerary Planner App)

A mock travel itinerary planner that helps users plan their trips. 

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Website Wireframe](#website-wireframe)
- [Entity Relationship Diagram (ERD)](#erd)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Next Steps](#next-steps)
- [Contact](#contact)

## About

Travelo contains features for creating itineraries as well as adding and deleting activities (hotels, food & drinks, things to do, things to see). It provides users with a one stop solution for all activities that are available to do in the city, and simplifies the overall travel planning process.

## Features

**User role:**
- Authentication - user registration and login
- Display of activities with filter function for hotels, food & drinks, things to see, things to do
- Display of individual activity details via modal
- Function to create "empty" itinerary based on form inputs of location, number of days of trip, itinerary title
- Function to add activities to specific days of the itinerary, and to delete them where needed (itneraries as well as their activities will be saved to database)
- Display of all user itineraries

**Admin role:**
- Authentication - login
- Access to admin dashboard where the full list of activities and their details are displayed
- Ability to create, read, update and delete activities from the database

## Tech Stack

**Frontend**: React
**Backend**: Node.js, Express.js
**UI Components**: Material UI
**Database**: PostgreSQL

## Installation

1. Clone the repository
```git clone https://github.com/jolynnk/travelplanner.git```
```cd travelplanner```

2. Navigate to backend
```cd Backend```

3. Install the required npm packages (backend)
```npm init -y```
```npm i express postgres dotenv```

4. Navigate to frontend
```cd React```

5. Install the required npm packages (frontend)
```npm i react-router-dom```
```npm i @mui/material @emotion/react @emotion/styled @mui/icons-material```

6. Environment variables - create a .env file in the root of your backend and frontend directories and insert the following code
Frontend: ```VITE_SERVER=http://127.0.0.1:[replace with your port number]```
Backend: ```SECRET_KEY=[replace with your secret key]```

## Website Wireframe

<img width="756" alt="Wireframe" src="https://github.com/di-wee/Project-Manhatten-D/assets/126299115/c8784613-5ab9-4ea7-9870-9346d3f3230e">

## ERD

<img width="996" alt="TravelPlanner_ERD" src="https://github.com/jolynnk/travelplanner/assets/126299115/9e503209-045f-401b-9b84-499ed1ef8372">

## Screenshots

### Registration Page

<img width="1440" alt="registration" src="https://github.com/jolynnk/travelplanner/assets/126299115/01956b1f-942d-4567-a0e4-6e14a5c1e74d">

### Login Page

<img width="1440" alt="login" src="https://github.com/jolynnk/travelplanner/assets/126299115/c2581c96-cd3e-4c75-b176-7289725167b7">

### Create Itinerary Page

<img width="1440" alt="create_itinerary" src="https://github.com/jolynnk/travelplanner/assets/126299115/ed2cd3e5-3a51-4aa0-a3bb-e8813cc4a2da">

### Activity Details Modal

<img width="1440" alt="activity_details_modal" src="https://github.com/jolynnk/travelplanner/assets/126299115/899c6add-fa4d-4bcc-917e-67478821de7c">

### Activities Added to Itinerary

<img width="1440" alt="itinerary_with_activities" src="https://github.com/jolynnk/travelplanner/assets/126299115/7c1252b5-7047-4bdc-809b-d4ef057b9f06">

### Current Itineraries Page

<img width="1440" alt="user_itineraries" src="https://github.com/jolynnk/travelplanner/assets/126299115/db94a56f-3782-4368-bb5a-c8e66884fce0">

### Admin Dashboard

<img width="1440" alt="admin_dashboard" src="https://github.com/jolynnk/travelplanner/assets/126299115/5adf39eb-8a0d-41e2-acb8-361bbd87a38b">

### Create New Activity Form

<img width="1440" alt="activity_creation_form" src="https://github.com/jolynnk/travelplanner/assets/126299115/7c489f72-1207-461b-9961-bd2054521de4">

### Update Activity Form

<img width="1440" alt="activity_update_form" src="https://github.com/jolynnk/travelplanner/assets/126299115/1f45ad73-3cee-49c7-9025-9376acba16a5">

## API Endpoints

| Method  | Endpoint                                                | Description                    |
| ------- | ------------------------------------------------------- | ------------------------------ |
| POST    | /auth/register                                          | Registration                   |
| POST    | /auth/login                                             | Login                          |
| GET     | /api/activities                                         | Get all activities             |
| GET     | /api/activities/:id                                     | Get individual activity        |
| PATCH   | /api/activities/:id                                     | Update individual activity     |
| POST    | /api/activities                                         | Add activity                   |
| DELETE  | /api/activities/:id                                     | Delete individual activity     |
| POST    | /api/itinerary                                          | Create new itinerary           |
| PATCH   | /api/itinerary/update                                   | Add activity to itinerary      |
| DELETE  | /api/itinerary/delete-activity/:itineraryId/:activityId | Delete activity from itinerary |
| GET     | /api/itineraries/user                                   | Get all itineraries            |
| DELETE  | /api/itinerary/delete/:id                               | Delete itinerary               |
| GET     | /api/activity-type                                      | Get all activity types         |

## Next Steps

- Implement Smartinerary feature where a customised itinerary will be provided to the user after they input their preferences on their ideal trip (type of holiday, favourite cuisines, budget etc)
- Implement map routing feature where directions will be provided for user to move between places

## Contact

[LinkedIn](https://www.linkedin.com/in/jolynn-khoo/)
