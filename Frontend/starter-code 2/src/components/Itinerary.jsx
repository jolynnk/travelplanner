import React, { useRef, useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
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
      const res = await fetch(import.meta.env.VITE_SERVER + "/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          <h4>Day {day}</h4>
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
              Number of days:
              <select name="numberOfDays" onChange={handleNumOfDaysChange}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
            </label>
            <br />
            <label>
              Itinerary name:
              <input
                // value={itineraryTitle}
                // onChange={(e) => setItineraryTitle(e.target.value)} // Update the itineraryTitle state
                ref={titleRef}
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
              <h3>My trip</h3>
              <p>Location: {locationRef.current.value}</p>
              <p>Itinerary Title: {titleRef.current.value}</p>
              {/* iterate thru array created by generateDayRows and creates div for each Day */}
              {generateDayRows().map((day, index) => (
                <div key={index}>
                  <h4>{day}</h4>
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
                        <img src={activity.image} alt={activity.title} />
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
