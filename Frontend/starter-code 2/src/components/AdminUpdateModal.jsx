import { Button, Select, MenuItem } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import styles from "./Modal.module.css";

const AdminUpdateModal = (props) => {
  const [activityTypes, setActivityTypes] = useState([]); //stores the different activity types
  const [selectedActivityType, setSelectedActivityType] = useState(""); //stores the selected activity type

  const titleRef = useRef();
  const descriptionRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const ratingsRef = useRef();
  const opening_hoursRef = useRef();
  const costRef = useRef();
  const imageRef = useRef();

  //fetch activity types for dropdown usage
  const fetchActivityTypes = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/activity-type`
      );
      if (res.ok) {
        const data = await res.json();
        setActivityTypes(data);
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
    const activityId = props.selectedActivity;
    console.log(activityId)

    //get single activity details
    try {
      const existingActivityDetails = await fetch(
        `${import.meta.env.VITE_SERVER}/api/activities/${activityId}`
      );
      if (!existingActivityDetails.ok) {
        alert("Error fetching existing activity details");
        return;
      }

      const existingActivityData = await existingActivityDetails.json();

      //update each field, prioritising what was keyed into the fields. if blank, take info from existingActivityData
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
          <form style={{ padding: "30px 0px 0px 40px" }}>
            <h4>Update Activity Form</h4>
            <label style={{ padding: "15px 90px 0px 0px" }}>
              Activity Type
            </label>
            <Select
              className={styles.activityTypeDropdown}
              value={selectedActivityType}
              onChange={(e) => setSelectedActivityType(e.target.value)}
              style={{ height: "35px", width: "188px" }}
            >
              {activityTypes.map((type) => (
                <MenuItem key={type.id} value={type.activity_type_name}>
                  {type.activity_type_name}
                </MenuItem>
              ))}
            </Select>
            <br />
            <label style={{ padding: "15px 141px 0px 0px" }}>Name</label>
            <input type="text" ref={titleRef}></input>
            <br />
            <label style={{ padding: "15px 100px 0px 0px" }}>Description</label>
            <input type="text" ref={descriptionRef}></input>
            <br />
            <label style={{ padding: "15px 70px 0px 0px" }}>
              Neighbourhood
            </label>
            <input type="text" ref={districtRef}></input>
            <br />
            <label style={{ padding: "15px 123px 0px 0px" }}>Address</label>
            <input type="text" ref={addressRef}></input>
            <br />
            <label style={{ padding: "15px 136px 0px 0px" }}>Rating</label>
            <input type="text" ref={ratingsRef}></input>
            <br />
            <label style={{ padding: "15px 73px 0px 0px" }}>
              Opening Hours
            </label>
            <input type="text" ref={opening_hoursRef}></input>
            <br />
            <label style={{ padding: "15px 148px 0px 0px" }}>Cost</label>
            <input type="text" ref={costRef}></input>
            <br />
            <label style={{ padding: "15px 136px 0px 0px" }}>Image</label>

            <input type="text" ref={imageRef}></input>
            <br />
            <div style={{ margin: "18px 10px 10px -15px" }}>
              <Button onClick={() => updateActivity(props.selectedActivity)}>
                Save
              </Button>
              <Button onClick={() => props.setShowModal(false)}>Close</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminUpdateModal;
