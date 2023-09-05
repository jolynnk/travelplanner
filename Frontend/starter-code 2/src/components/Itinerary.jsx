import React, { useRef } from "react";
import Button from "@mui/material/Button";

const Itinerary = () => {
  const locationRef = useRef();
  const num_of_daysRef = useRef();
  const titleRef = useRef();

  const createItinerary = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: locationRef.current.value,
          num_of_days: num_of_daysRef.current.value,
          title: titleRef.current.value,
        }),
      });

      if (!res.ok) {
        alert("Error creating itinerary");
      } else {
        alert("Itinerary created successfully");
        // You may want to refresh the activity list here or redirect to another page
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

  return (
    <>
      <h3>Create a new trip</h3>
      <form>
        <label>
          Location:
          <select ref={locationRef} name="location">
            <option value="London">London</option>
            <option value="Tokyo">Tokyo (coming soon)</option>
            <option value="New York">New York (coming soon)</option>
            <option value="Paris">Paris (coming soon)</option>
            <option value="Singapore">Singapore (coming soon)</option>
          </select>
        </label>
        <br />
        <label>
          Number of Days:
          <select ref={num_of_daysRef} name="numberOfDays">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
          </select>
        </label>
        <br />
        <label>
          Title of Itinerary
          <input ref={titleRef}></input>
        </label>
        <br />
        <Button
          onClick={() => {
            createItinerary();
          }}
        >
          Create Itinerary
        </Button>
      </form>
    </>
  );
};

export default Itinerary;
