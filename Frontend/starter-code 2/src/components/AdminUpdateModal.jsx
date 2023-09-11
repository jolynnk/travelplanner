import { Button, Select, MenuItem } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import styles from "./Modal.module.css";

const AdminUpdateModal = (props) => {
  const [activityTypes, setActivityTypes] = useState([]);
  const [selectedActivityType, setSelectedActivityType] = useState(""); // To store the selected activity type

  const titleRef = useRef();
  const descriptionRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const ratingsRef = useRef();
  const opening_hoursRef = useRef();
  const costRef = useRef();
  const imageRef = useRef();

  console.log("Selected Activity:", props.selectedActivity);

  //fetch activity types for dropdown usage
  const fetchActivityTypes = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/activity-type`
      );
      if (res.ok) {
        const data = await res.json();
        setActivityTypes(data);
        console.log(data);
      } else {
        console.error("Error fetching activity types");
      }
    } catch (error) {
      console.error("An error occurred while fetching activity types", error);
    }
  };

  useEffect(() => {
    fetchActivityTypes();
  }, []);

  //update activity (ADMIN)
  const updateActivity = async () => {
    const activityId = props.selectedActivity; // Get the activity_id from props
    console.log(activityId);

    try {
      const existingActivityDetails = await fetch(
        `${import.meta.env.VITE_SERVER}/api/activities/${activityId}`
      );
      if (!existingActivityDetails.ok) {
        alert("Error fetching existing activity details");
        return;
      }

      const existingActivityData = await existingActivityDetails.json();

      // Update each field conditionally, prioritising what was keyed into the fields. if blank, take info from existingActivityData
      existingActivityData.activity_type_name =
        selectedActivityType || existingActivityData.activity_type_name;
      existingActivityData.title =
        titleRef.current.value || existingActivityData.title;
      existingActivityData.description =
        descriptionRef.current.value || existingActivityData.description;
      existingActivityData.district =
        districtRef.current.value || existingActivityData.district;
      existingActivityData.address =
        addressRef.current.value || existingActivityData.address;
      existingActivityData.ratings =
        ratingsRef.current.value || existingActivityData.ratings;
      existingActivityData.opening_hours =
        opening_hoursRef.current.value || existingActivityData.opening_hours;
      existingActivityData.cost =
        costRef.current.value || existingActivityData.cost;
      existingActivityData.image =
        imageRef.current.value || existingActivityData.image;

      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/activities/${activityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(existingActivityData),
        }
      );

      if (!res.ok) {
        alert("Error updating activity");
      } else {
        alert("Activity updated successfully");
        props.setShowModal(false);
        props.getActivities();
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <form>
            <label>Activity Type</label>
            <Select
              className={styles.activityTypeDropdown} // Add a custom class name
              value={selectedActivityType} // Set the value to the selectedActivityType state
              onChange={(e) => setSelectedActivityType(e.target.value)} // Update the selectedActivityType state on change
            >
              {activityTypes.map((type) => (
                <MenuItem key={type.id} value={type.activity_type_name}>
                  {type.activity_type_name}
                </MenuItem>
              ))}
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
            <Button onClick={() => updateActivity(props.selectedActivity)}>
              Save
            </Button>
            <Button onClick={() => props.setShowModal(false)}>Close</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminUpdateModal;
