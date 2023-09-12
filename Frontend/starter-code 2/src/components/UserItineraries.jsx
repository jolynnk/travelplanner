import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";

//get all user itineraries
const UserItineraries = () => {
  const [userItineraries, setUserItineraries] = useState([]);

  const getItineraries = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken"); //retrieve the authentication token from storage after user logs in

      if (!authToken) {
        // Check if the token is available
        alert("Authentication token is missing");
        return;
      }

      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/itineraries/user",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the headers to authenticate user's request on the server
          },
        }
      );
      console.log("Response:", res); // Log the response object
      const data = await res.json();
      console.log("Data:", data); // Log the data received from the server
      setUserItineraries(data);

      if (!res.ok) {
        alert("error fetching data");
      }
    } catch (error) {
      console.log(error.message);
      alert("an error has occurred");
    }
  };

  useEffect(() => {
    getItineraries();
  }, []);

  const itinerariesWithActivities = {}; // Create an object to group activities by itinerary

  userItineraries.forEach((itinerary) => {
    if (!itinerariesWithActivities[itinerary.itinerary_id]) {
      itinerariesWithActivities[itinerary.itinerary_id] = {
        ...itinerary,
        activities: [],
      };
    }

    itinerariesWithActivities[itinerary.itinerary_id].activities.push({
      activity_id: itinerary.activity_id,
      day: itinerary.day,
      activity_title: itinerary.activity_title,
      activity_type_name: itinerary.activity_type_name,
      description: itinerary.description,
    });
  });

  //function to delete itinerary (USER)
  const handleDeleteItinerary = async (itineraryId) => {
    try {
      const authToken = localStorage.getItem("jwtToken");
      if (!authToken) {
        alert("Authentication token is missing");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/itinerary/delete/${itineraryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Itinerary deleted successfully");
        getItineraries();
      } else {
        alert("Error deleting itinerary");
      }
    } catch (error) {
      console.error(error.message);
      alert("An error has occurred");
    }
  };

  return (
    <div>
      <h1>Your Itineraries</h1>
      <ul>
        {Object.values(itinerariesWithActivities).map((itinerary) => (
          <div key={itinerary.itinerary_id}>
            <h2>{itinerary.itinerary_title}</h2>
            <p>City: {itinerary.itinerary_location}</p>
            <p>Number of days: {itinerary.num_of_days}</p>
            <ul>
              {itinerary.activities.map((activity) => (
                <li key={activity.activity_id}>
                  <h5>
                    [Day {activity.day}] {activity.activity_title}
                  </h5>
                  <p>Type: {activity.activity_type_name}</p>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleDeleteItinerary(itinerary.itinerary_id)}
            >
              Delete Itinerary
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserItineraries;
