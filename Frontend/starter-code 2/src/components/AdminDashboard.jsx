import { Grid, Button, List, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import AdminUpdateModal from "./AdminUpdateModal";

const AdminDashboard = () => {
  const [activity, setActivity] = useState([]);
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityTypeName, setActivityTypeName] = useState("");

  //toggle visibility of add activity form
  const toggleAddActivityForm = () => {
    setShowAddActivityForm(!showAddActivityForm);
  };

  // Retrieve the user role from localStorage (default to "user" if not found)
  const userRole = JSON.parse(localStorage.getItem("userRole")) || [];
  console.log(userRole);

  const activity_type_nameRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const ratingsRef = useRef();
  const opening_hoursRef = useRef();
  const costRef = useRef();
  const imageRef = useRef();

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
  const createActivity = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity_type_name: activityTypeName,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          district: districtRef.current.value,
          address: addressRef.current.value,
          ratings: ratingsRef.current.value,
          opening_hours: opening_hoursRef.current.value,
          cost: costRef.current.value,
          image: imageRef.current.value,
        }),
      });

      if (!res.ok) {
        alert("Error creating activity");
      } else {
        alert("Activity created successfully");
        getActivities();
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  //delete activity (ADMIN)
  const deleteActivity = async (activity_id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + `/api/activities/${activity_id}`, // Use the activity_id to specify the activity to delete
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        alert("Error deleting activity");
      } else {
        alert("Activity deleted successfully");
        // Refresh the activity list after deleting the activity
        getActivities();
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
      <Button onClick={toggleAddActivityForm}>
        {showAddActivityForm ? "Cancel" : "Add Activity"}
      </Button>
      {showAddActivityForm && (
        <form>
          <Select
            value={activityTypeName}
            onChange={(e) => setActivityTypeName(e.target.value)}
          >
            <MenuItem value="Hotels">Hotels</MenuItem>
            <MenuItem value="Food & Drinks">Food & Drinks</MenuItem>
            <MenuItem value="Things to see">Things to see</MenuItem>
            <MenuItem value="Things to do">Things to do</MenuItem>
          </Select>
          <br />
          <input type="text" placeholder="name" ref={titleRef}></input>
          <br />
          <input
            type="text"
            placeholder="description"
            ref={descriptionRef}
          ></input>
          <br />
          <input
            type="text"
            placeholder="neighbourhood"
            ref={districtRef}
          ></input>
          <br />
          <input type="text" placeholder="address" ref={addressRef}></input>
          <br />
          <input type="text" placeholder="rating" ref={ratingsRef}></input>
          <br />
          <input
            type="text"
            placeholder="opening hours"
            ref={opening_hoursRef}
          ></input>
          <br />
          <input type="text" placeholder="cost" ref={costRef}></input>
          <br />
          <input type="text" placeholder="image" ref={imageRef}></input>
          {userRole.includes("admin") && (
            <Button onClick={(e) => createActivity(e)}>Submit</Button>
          )}
        </form>
      )}
      <br></br>
      <hr></hr>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {activity.map((item) => (
          <List item xs={10} sm={6} md={1} key={item.activity_id}>
            Activity ID: {item.activity_id} <br />
            Activity Type: {item.activity_type_name}
            <br />
            <img src={item.image} width="100px" />
            <br />
            Name: {item.title}
            <br />
            Description: {item.description}
            <br />
            Neighbourhood: {item.district}
            <br />
            Address: {item.address}
            <br />
            Rating: {item.ratings}
            <br />
            Opening Hours: {item.opening_hours}
            <br />
            Cost: {item.cost}
            <br />
            <Button
              onClick={() => {
                setShowModal(true);
                setSelectedActivity(item.activity_id);
              }}
            >
              Update
            </Button>
            <Button onClick={() => deleteActivity(item.activity_id)}>
              Delete
            </Button>
            <hr></hr>
          </List>
        ))}
      </Grid>

      {showModal && (
        <AdminUpdateModal
          //   activity_type_nameRef={activity_type_nameRef}
          //   titleRef={titleRef}
          //   descriptionRef={descriptionRef}
          //   districtRef={districtRef}
          //   addressRef={addressRef}
          //   ratingsRef={ratingsRef}
          //   opening_hoursRef={opening_hoursRef}
          //   costRef={costRef}
          //   imageRef={imageRef}
          //   updateActivity={updateActivity}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedActivity={selectedActivity} // Pass the selected activity data
          getActivities={getActivities}
        ></AdminUpdateModal>
      )}
    </>
  );
};

export default AdminDashboard;
