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
import DetailsModal from "./DetailsModal";

const ActivityItem = (props) => {
  const [selectedDay, setSelectedDay] = useState(1); //stores the day to add activity to (handleDayChange function)
  const [showModal, setShowModal] = useState(false);

  const userRole = JSON.parse(localStorage.getItem("userRole")) || [];

  //update selectedDay state with the input on which day to add activity to
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  //add activity to itinerary
  const addToTrip = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken");

      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/itinerary/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            activity_id: props.activity_id,
            day: selectedDay, //the day that was selected in dropdown of activity (handleDayChangefunction)
          }),
        }
      );

      if (!res.ok) {
        alert("Error adding activity to itinerary");
      } else {
        const updatedActivities = { ...props.activitiesByDay }; //clone existing activities for the day

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
          activity_id: props.activity_id,
        });

        //update state and display via Itinerary.jsx
        props.setActivitiesByDay(updatedActivities);

        //reset selected day to Day 1
        setSelectedDay(1);
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  //chatGPT ref: how to create day selection dropdown with max no. of days being the number that user input in "number of days" in itinerary form
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
          <CardMedia component="img" height="330" src={props.image} />
          <CardContent>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body1">{props.activity_type_name}</Typography>
            <Typography variant="body1">Price: {props.cost}</Typography>
            <Typography variant="body1">
              Neighbourhood: {props.district}
            </Typography>
            <Button
              onClick={() => setShowModal(true)}
              variant="outlined"
              sx={{
                width: "90px",
                color: "black",
                backgroundColor: "white",
                borderColor: "black",
                justifyItems: "center",
                margin: "20px 5px",
              }}
            >
              details
            </Button>

            {/* iterates through dayOptions array. for each option, MenuItem created showing the day no. */}
            {userRole.includes("user") && (
              <FormControl>
                <Select
                  value={selectedDay}
                  onChange={handleDayChange}
                  sx={{
                    height: "36px",
                    width: "87px",
                    marginTop: "20px",
                    marginLeft: "51px",
                  }}
                >
                  {dayOptions.map((option) => (
                    <MenuItem key={option.day} value={option.day}>
                      Day {option.day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {userRole.includes("user") && (
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
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      {showModal && (
        <DetailsModal
          activity_id={props.activity_id}
          activity_type_name={props.activity_type_name}
          image={props.image}
          title={props.title}
          description={props.description}
          district={props.district}
          address={props.address}
          ratings={props.ratings}
          opening_hours={props.opening_hours}
          cost={props.cost}
          showModal={showModal}
          setShowModal={setShowModal}
        ></DetailsModal>
      )}
    </>
  );
};

export default ActivityItem;
