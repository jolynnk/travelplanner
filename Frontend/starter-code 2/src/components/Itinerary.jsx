import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";

const Itinerary = () => {
  const locationRef = useRef();
  const titleRefs = useRef([]);
  const [activities, setActivities] = useState([]);
  const [numOfDays, setNumOfDays] = useState(1); // Default to 1 day
  const [itineraryTitle, setItineraryTitle] = useState(""); // Added state for itinerary title

  const createItinerary = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: locationRef.current.value,
          num_of_days: numOfDays,
          title: itineraryTitle, // Use the itineraryTitle state here
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

  //add code for adding activity to itinerary
  const addActivity = (title, day) => {
    // Create a new activity object with title and day information
    const newActivity = { title, day };

    // Add the new activity to the activities array
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const handleNumOfDaysChange = (event) => {
    const selectedNumOfDays = parseInt(event.target.value, 10);
    setNumOfDays(selectedNumOfDays);
  };

  const generateDayRows = () => {
    const rows = [];
    for (let day = 1; day <= numOfDays; day++) {
      rows.push(
        <div key={day}>
          <h4>Day {day}</h4>
          {/* Add activity creation form for each day here */}
          <label>
            Title:
            <input ref={(el) => (titleRefs.current[day - 1] = el)} />
          </label>
          {/* Include other input fields for activity details */}
          <Button
            onClick={() => {
              addActivity(titleRefs.current[day - 1].value, day);
            }}
          >
            Add Activity for Day {day}
          </Button>
        </div>
      );
    }
    return rows;
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
          <select name="numberOfDays" onChange={handleNumOfDaysChange}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Title of Itinerary
          <input
            value={itineraryTitle}
            onChange={(e) => setItineraryTitle(e.target.value)} // Update the itineraryTitle state
          />
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

      {/* Display Activities */}
      <h3>Activities</h3>
      {generateDayRows()}
    </>
  );
};

export default Itinerary;
