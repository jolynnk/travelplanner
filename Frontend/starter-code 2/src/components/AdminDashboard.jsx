import { Grid, Button, List } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ActivityItem from "./ActivityItem";

const AdminDashboard = () => {
  const [activity, setActivity] = useState([]);

  const activity_type_nameRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const ratingsRef = useRef();
  const opening_hoursRef = useRef();
  const costRef = useRef();

  //get all activities (ADMIN)
  const getActivities = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/activities");
      const data = await res.json();
      setActivity(data);
      console.log(data);

      if (!res.ok) {
        alert("error fetching data");
      }
    } catch (error) {
      console.log(error.message);
      alert("an error has occurred");
    }
  };

  //get single activity (USER & ADMIN)
  const getActivityById = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/activities/:id"
      );

      if (!res.ok) {
        alert("Error fetching activity");
      } else {
        const data = await res.json();
        // Handle the retrieved activity data
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  //create activity (ADMIN)
  const createActivity = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity_type_name: activity_type_nameRef.current.value,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          district: districtRef.current.value,
          address: addressRef.current.value,
          ratings: ratingsRef.current.value,
          opening_hours: opening_hoursRef.current.value,
          cost: costRef.current.value,
        }),
      });

      if (!res.ok) {
        alert("Error creating activity");
      } else {
        alert("Activity created successfully");
        // You may want to refresh the activity list here or redirect to another page
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  //update activity (ADMIN)
  const updateActivity = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/activities/:id",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activity_type_name: activity_type_nameRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            district: districtRef.current.value,
            address: addressRef.current.value,
            ratings: ratingsRef.current.value,
            opening_hours: opening_hoursRef.current.value,
            cost: costRef.current.value,
          }),
        }
      );

      if (!res.ok) {
        alert("Error updating activity");
      } else {
        alert("Activity updated successfully");
        // You may want to refresh the activity list here or redirect to another page
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  //delete activity (ADMIN)
  const deleteActivity = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/activities/:id",
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        alert("Error deleting activity");
      } else {
        alert("Activity deleted successfully");
        // You may want to refresh the activity list here or redirect to another page
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <Button>Add Activity</Button>
      <br></br>
      <hr></hr>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {activity.map((item) => (
          <List item xs={10} sm={6} md={1} key={item.activity_id}>
            Activity ID: {item.activity_id} <br />
            Activity Type: {item.activity_type_name}<br />
            <img src={item.image} width="100px"/><br />
            Name: {item.title}<br />
            Description: {item.description}<br />
            Neighbourhood: {item.district}<br />
            Address: {item.address}<br />
            Rating: {item.ratings}<br />
            Opening Hours: {item.opening_hours}<br />
            Cost: {item.cost}<br />
            <Button>Update</Button>
            <Button>Delete</Button>
            <hr></hr>
          </List>
        ))}
      </Grid>
    </>
  );
};

export default AdminDashboard;
