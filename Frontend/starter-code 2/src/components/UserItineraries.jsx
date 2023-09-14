import React, { useState, useEffect } from "react";
import { Button, Card } from "@mui/material";

const UserItineraries = () => {
  const [userItineraries, setUserItineraries] = useState([]); //stores all user's itineraries via getItineraries function

  //get all user itineraries (USER)
  const getItineraries = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken"); //retrieve the authentication token from storage after user logs in

      if (!authToken) {
        //check if the token is available
        alert("Authentication token is missing");
        return;
      }

      const res = await fetch(
        import.meta.env.VITE_SERVER + "/api/itineraries/user",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, //include the token in the headers to authenticate user's request on the server
          },
        }
      );
      const data = await res.json();
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

  //delete itinerary (USER)
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
        getItineraries(); //does not refresh page with latest itinerary
      } else {
        alert("Error deleting itinerary");
      }
    } catch (error) {
      console.error(error.message);
      alert("An error has occurred");
    }
  };

  //group activities by itinerary (instead of listing every single activity)
  const itinerariesWithActivities = {};

  userItineraries.forEach((itinerary) => {
    //iterates thru userItineraries array/state
    if (!itinerariesWithActivities[itinerary.itinerary_id]) {
      //if nothing in array of particular itinerary id
      itinerariesWithActivities[itinerary.itinerary_id] = {
        //create new object for itinerary id with empty activities array
        ...itinerary,
        activities: [],
      };
    }

    itinerariesWithActivities[itinerary.itinerary_id].activities.push({
      //push the following data into the activities array of the itinerary id object
      activity_id: itinerary.activity_id,
      day: itinerary.day,
      activity_title: itinerary.activity_title,
      activity_type_name: itinerary.activity_type_name,
      description: itinerary.description,
      image: itinerary.image,
    });
  });

  console.log(itinerariesWithActivities);

  return (
    <div
      style={{
        color: "#4f6369",
        margin: "30px",
      }}
    >
      <h2>Your itineraries</h2>
      <br />
      <Card
        style={{
          color: "#4f6369",
          padding: "35px",
        }}
      >
        <ul>
          {/* Object.values converts the object's values into array so that it can be mapped over */}
          {Object.values(itinerariesWithActivities).map((itinerary) => (
            <div key={itinerary.itinerary_id}>
              <h4>{itinerary.itinerary_title}</h4>
              <p>City: {itinerary.itinerary_location}</p>
              <p>Trip days: {itinerary.num_of_days}</p>
              <ul>
                {itinerary.activities.map((activity) => (
                  <li
                    key={activity.activity_id}
                    style={{ paddingBottom: "20px" }}
                  >
                    <h6>
                      [Day {activity.day}] {activity.activity_title}
                    </h6>
                    <p>Type: {activity.activity_type_name}</p>
                    <img
                      src={activity.image}
                      alt={activity.title}
                      width="180px"
                      style={{ marginLeft: "30px" }}
                    />
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleDeleteItinerary(itinerary.itinerary_id)}
              >
                Delete Itinerary
              </Button>
              <hr></hr>
            </div>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default UserItineraries;
