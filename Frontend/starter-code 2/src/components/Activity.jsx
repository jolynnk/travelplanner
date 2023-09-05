import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ActivityItem from "./ActivityItem";

const Activity = () => {
  const [activity, setActivity] = useState([]);

  const activity_type_nameRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const ratingsRef = useRef();
  const opening_hoursRef = useRef();
  const costRef = useRef();

  //get all activities (USER and ADMIN)
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
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {activity.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.activity_id}>
          <ActivityItem
            activity_id={item.activity_id}
            activity_type_name={item.activity_type_name}
            image={item.image}
            title={item.title}
            description={item.description}
            district={item.district}
            address={item.address}
            ratings={item.ratings}
            opening_hours={item.opening_hours}
            cost={item.cost}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Activity;
