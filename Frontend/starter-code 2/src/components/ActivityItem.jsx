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

  const addToTrip = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/itinerary/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itinerary_id: props.itinerary_id,
          activity_id: props.activity_id,
          day: selectedDay,
        }),
      });
  
      if (!res.ok) {
        alert("Error adding activity to itinerary");
      } else {
        // Update activitiesByDay state based on the selected day
        const updatedActivities = { ...props.activitiesByDay };
  
        if (!updatedActivities[selectedDay]) {
          updatedActivities[selectedDay] = [];
        }
  
        updatedActivities[selectedDay].push({
          activity_type_name: props.activity_type_name,
          title: props.title,
          district: props.district,
          opening_hours: props.opening_hours,
          cost: props.cost,
          image: props.image,
        });
  
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
  

  // Generate an array of options from Day 1 to numOfDays
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
