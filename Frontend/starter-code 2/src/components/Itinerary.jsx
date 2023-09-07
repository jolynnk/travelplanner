import React, { useRef, useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import ActivityItem from "./ActivityItem";

const Itinerary = () => {
  const locationRef = useRef();
  const titleRef = useRef();
  const [numOfDays, setNumOfDays] = useState(3); //3 days as default
  // const [itineraryTitle, setItineraryTitle] = useState(""); // Added state for itinerary title
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [itinerary_id, setitinerary_id] = useState(null);
  const [activity, setActivity] = useState([]);
  const [activitiesByDay, setActivitiesByDay] = useState({});

  //create blank itinerary
  const createItinerary = async () => {
    try {
      // Retrieve the JWT token from localStorage
      const authToken = localStorage.getItem("jwtToken");

      const res = await fetch(import.meta.env.VITE_SERVER + "/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          location: locationRef.current.value,
          num_of_days: numOfDays,
          title: titleRef.current.value,
        }),
      });

      if (!res.ok) {
        alert("Error creating itinerary");
      } else {
        const data = await res.json();
        setitinerary_id(data.itinerary_id); // Store the newly created itinerary_id
        alert("Itinerary created successfully");
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

  //parseInt - built-in function to convert string into integer
  //10 - parse event.target.value as a base-10 number (numbering system consisting of 10 digits)
  const handleNumOfDaysChange = (event) => {
    const selectedNumOfDays = parseInt(event.target.value, 10);
    setNumOfDays(selectedNumOfDays); //put parsed string into a state
  };

  const generateDayRows = () => {
    const rows = [];
    for (let day = 1; day <= numOfDays; day++) {
      //loop from day 1 to selected no. of days. new div created with each loop
      rows.push(
        <div key={day}>
          <Typography
            variant="h5"
            style={{ fontSize: "20px", marginBottom: "20px" }}
          >
            Day {day}
          </Typography>
          <hr></hr>
        </div>
      );
    }
    return rows;
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <div className="page-container">
        <div
          className="itinerary-container"
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <Typography
            variant="h5"
            style={{
              fontSize: "28px",
              marginBottom: "20px",
              color: "#4f6369",
              fontWeight: "bold",
            }}
          >
            Create a new itinerary
          </Typography>
          <form>
            <label>
              Location:
              <select
                ref={locationRef}
                name="location"
                style={{
                  width: "70%",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              >
                <option value="London">London</option>
                <option value="Tokyo">Tokyo (coming soon)</option>
                <option value="New York">New York (coming soon)</option>
                <option value="Paris">Paris (coming soon)</option>
                <option value="Singapore">Singapore (coming soon)</option>
              </select>
            </label>
            <br />
            <label style={{ display: "block", marginBottom: "10px" }}>
              Number of days:
              <select
                name="numberOfDays"
                onChange={handleNumOfDaysChange}
                style={{
                  width: "35%",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
            </label>
            <label>
              Title:
              <input
                // value={itineraryTitle}
                // onChange={(e) => setItineraryTitle(e.target.value)} // Update the itineraryTitle state
                ref={titleRef}
                name="title"
                style={{
                  width: "75%",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "63%",
                backgroundColor: "#4f6369", // Change this color to your desired color
                color: "white", // Text color
              }}
              onClick={() => {
                createItinerary();
                setIsButtonClicked(true); // Set the button click state
              }}
            >
              Create
            </Button>
          </form>

          {/* Display Activities only when button is clicked */}
          {isButtonClicked && (
            <div>
              <br></br>
              <Typography
                variant="h5"
                style={{
                  fontSize: "28px",
                  marginBottom: "20px",
                  color: "#4f6369",
                  fontWeight: "bold",
                }}
              >
                My trip
              </Typography>
              <p>Location: {locationRef.current.value}</p>
              <p>Title: {titleRef.current.value}</p>
              <br></br>
              {/* iterate thru array created by generateDayRows and creates div for each Day */}
              {generateDayRows().map((day, index) => (
                <div key={index}>
                  <h5>{day}</h5>
                  {/* checks for activities associated with respective day of the iteration, and displays them*/}
                  {/* activitiesByDay - object holding info about activities organised by day */}
                  {/* index + 1: JS index starts with 0, hence adjustment made to ensure it's checking the right day vs that of generateDayRows' iteration */}
                  {/* ? - optional chaining (to safely access properties of an object). checks if there are activities for the day of index + 1, if none, will prevent code from breaking and return undefined */}
                  {activitiesByDay[index + 1]?.map(
                    (activity, activityIndex) => (
                      // div created for each activity
                      <div key={activityIndex}>
                        <h5>{activity.title}</h5>
                        <p>Type: {activity.activity_type_name}</p>
                        <p>District: {activity.district}</p>
                        <p>Opening Hours: {activity.opening_hours}</p>
                        <p>Cost: {activity.cost}</p>
                        <img
                          src={activity.image}
                          alt={activity.title}
                          width="150px"
                        />
                        <hr></hr>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="activity-container">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {/* prop down activities to ActivityItem.jsx for display */}
            {activity.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.activity_id}
                className="activity-card"
              >
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
                  numOfDays={numOfDays}
                  itinerary_id={itinerary_id}
                  activitiesByDay={activitiesByDay}
                  setActivitiesByDay={setActivitiesByDay}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Itinerary;
