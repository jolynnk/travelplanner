import { Button } from "@mui/material";
import React, { useRef } from "react";
import styles from "./Modal.module.css";

const AdminUpdateModal = (props) => {
  const activity_type_nameRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const ratingsRef = useRef();
  const opening_hoursRef = useRef();
  const costRef = useRef();
  const imageRef = useRef();

  console.log("Selected Activity:", props.selectedActivity);

  //update activity (ADMIN)
  const updateActivity = async () => {
    const activityId = props.selectedActivity; // Get the activity_id from props
    console.log(activityId);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/activities/${activityId}`,
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
            image: imageRef.current.value,
          }),
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
            <input
              type="text"
              placeholder="activity type"
              ref={activity_type_nameRef}
            ></input>
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
