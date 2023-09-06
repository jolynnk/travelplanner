import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
// import ActivityContext from "../context/ActivityContext";

const ActivityItem = (props) => {
  const [selectedDay, setSelectedDay] = useState(1); // Default to Day 1

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  //add activity to itinerary
  const addToTrip = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/itinerary/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itinerary_id: props.itinerary_id, //id generated at creation of itinerary
            activity_id: props.activity_id,
            day: selectedDay, //the day that was selected in dropdown of activity (handleDayChangefunction)
          }),
        }
      );

      if (!res.ok) {
        alert("Error adding activity to itinerary");
      } else {
        //clone existing activities for the day
        const updatedActivities = { ...props.activitiesByDay };

        //check if there are activities for selected day, if not create array. if there are activities already, will just add on to existing array
        if (!updatedActivities[selectedDay]) {
          updatedActivities[selectedDay] = [];
        }

        //add activity details to selected day
        updatedActivities[selectedDay].push({
          activity_type_name: props.activity_type_name,
          title: props.title,
          district: props.district,
          opening_hours: props.opening_hours,
          cost: props.cost,
          image: props.image,
        });

        //update state and display via Itinerary.jsx
        props.setActivitiesByDay(updatedActivities);

        alert("Activity added to itinerary successfully");

        // Reset the selected day to Day 1
        setSelectedDay(1);
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  //chatGPT ref: how do i create a day selection dropdown with the max no. of days being the number that user has input in "number of days" in itinerary form
  //for user to select which day to add activity to. generates an array of day options with length equal to props.numOfDays
  //Array.from - JS built in function that creates new array from an existing iterable object (based on length: props.numOfDays)
  //(_, index) => - this is a mapping function to iterate through each element of new array. 2 parameters accepted: _ is a placeholder for a variable that is not in use, index represents current index of array
  //day: index + 1 - with each iteration, a day object is created within the array. +1 as JS index starts at 0
  const dayOptions = Array.from({ length: props.numOfDays }, (_, index) => ({
    day: index + 1,
  }));

  return (
    <>
      <br />
      <br />
      <Card
        sx={{
          width: 400,
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="360" src={props.image} />
          <CardContent>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body1">
              Neighbourhood: {props.district}
            </Typography>
            <Typography variant="body1">Price: {props.cost}</Typography>
            <Button
              onClick={() => setShowModal(true)}
              variant="outlined"
              sx={{
                width: "90px",
                color: "black",
                backgroundColor: "white",
                borderColor: "black",
                justifyItems: "center",
                margin: "10px 5px",
              }}
            >
              details
            </Button>
            {/* iterates through dayOptions array. for each option, MenuItem created showing the day no. */}
            <FormControl>
              <Select value={selectedDay} onChange={handleDayChange}>
                {dayOptions.map((option) => (
                  <MenuItem key={option.day} value={option.day}>
                    Day {option.day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={addToTrip}
              variant="outlined"
              sx={{
                width: "120px",
                color: "black",
                backgroundColor: "white",
                borderColor: "black",
                justifyItems: "center",
                margin: "10px 5px",
              }}
            >
              add to trip
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ActivityItem;
