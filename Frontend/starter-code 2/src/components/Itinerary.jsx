import React, { useRef, useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ActivityItem from "./ActivityItem";

const Itinerary = () => {
  const locationRef = useRef();
  // const titleRefs = useRef([]);
  // const [activities, setActivities] = useState([]);
  const [numOfDays, setNumOfDays] = useState(3); // Default to 3 days
  const [itineraryTitle, setItineraryTitle] = useState(""); // Added state for itinerary title
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Track button click
  const [itinerary_id, setitinerary_id] = useState(null); //newcode

  const [activity, setActivity] = useState([]);

  //create blank itinerary
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
        const data = await res.json(); //newcode
        setitinerary_id(data.itinerary_id); // Store the newly created itinerary_id. newcode
        alert("Itinerary created successfully");
        // You may want to refresh the activity list here or redirect to another page
      }
    } catch (error) {
      console.log(error.message);
      alert("An error has occurred");
    }
  };

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
          <hr></hr>
        </div>
      );
    }
    return rows;
  };

  useEffect(() => {
    getActivities(); // Call the getActivities function to fetch activities
  }, []);

  return (
    <>
      <h3>Create a new itinerary</h3>
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
            setIsButtonClicked(true); // Set the button click state
          }}
        >
          Create Itinerary
        </Button>
      </form>
      {/* Display Activities only when button is clicked */}
      {isButtonClicked && (
        <div>
          <h3>Itinerary</h3>
          <p>Location: {locationRef.current.value}</p>
          <p>Itinerary Title: {itineraryTitle}</p>
          {generateDayRows()}
        </div>
      )}

      {/* Update your Itinerary component to pass the numOfDays value to the
      ActivityItem component: */}
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
              numOfDays={numOfDays} // Pass numOfDays as a prop
              itinerary_id={itinerary_id} //newcode
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Itinerary;
