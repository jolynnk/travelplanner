import React, { useRef, useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import ActivityItem from "./ActivityItem";

const Itinerary = () => {
  const locationRef = useRef();
  const titleRef = useRef();
  const [numOfDays, setNumOfDays] = useState(3); //store user input on no. of days for itinerary to be created
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [itinerary_id, setitinerary_id] = useState(null); //store newly created itinerary id when itinerary created
  const [activity, setActivity] = useState([]); //stores list of activities available (getActivities function)
  const [activitiesByDay, setActivitiesByDay] = useState({}); //to store the activities for each day when addToTrip function called
  // const [userItineraries, setUserItineraries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const userRole = JSON.parse(localStorage.getItem("userRole")) || []; //extract user role to grant specific permisions

  //create blank itinerary (USER)
  const createItinerary = async () => {
    try {
      const authToken = localStorage.getItem("jwtToken"); //retrieve JWT token from localStorage (generated when user logs in)

      const res = await fetch(import.meta.env.VITE_SERVER + "/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, //tells server that request is authenticated with provided token, and to verify user's identity and grant access
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
        setitinerary_id(data.itinerary_id); //store the newly created itinerary_id
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

      if (!res.ok) {
        alert("error fetching data");
      }
    } catch (error) {
      console.log(error.message);
      alert("an error has occurred");
    }
  };

  //chatGPT ref: how to create a blank itinerary to be populated with activities later on, based on the inputs in the itinerary form
  //parseInt - built-in function to convert string into integer
  //10 - parse event.target.value as a base-10 number (numbering system consisting of 10 digits)
  const handleNumOfDaysChange = (event) => {
    const selectedNumOfDays = parseInt(event.target.value, 10);
    setNumOfDays(selectedNumOfDays); //put parsed string into a state
  };

  //creates the empty days as divs within the newly created itinerary
  const generateDayRows = () => {
    const rows = [];
    for (let day = 1; day <= numOfDays; day++) {
      //loop from day 1 to selected no. of days. new div created with each loop
      rows.push(
        <div key={day}>
          <Typography
            variant="h5"
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              color: "#4f6369",
              fontWeight: "bold",
            }}
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

  //function to delete activity from itinerary (USER)
  const handleDeleteActivity = async (itineraryId, activityId) => {
    try {
      const authToken = localStorage.getItem("jwtToken");
      if (!authToken) {
        alert("Authentication token is missing");
        return;
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER
        }/api/itinerary/delete-activity/${itineraryId}/${activityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Activity deleted successfully");
      } else {
        alert("Error deleting activity");
      }
    } catch (error) {
      console.error(error.message);
      alert("An error has occurred");
    }
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter); //updates selectedFilter state based on filter selected by user
  };

  const filteredActivities = activity.filter((item) => {
    if (selectedFilter === "All") {
      return true; //show all activities when "All" selected
    } else {
      return item.activity_type_name === selectedFilter;
    }
  });

  return (
    <>
      <div className="page-container">
        <div
          className="itinerary-container"
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
            <div className={isButtonClicked ? "" : "form-container"}>
            {userRole.includes("user") && (
              <div>
              <Typography
                variant="h5"
                style={{
                  fontSize: "20px",
                  color: "#4f6369",
                  fontWeight: "bold",
                }}
              >
                Step 1{" "}
              </Typography>
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
              </div>
            )}
              <form>
                <label
                  style={{
                    color: "#4f6369",
                  }}
                >
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
                    disabled={isButtonClicked} //disable field when "create" button clicked
                  >
                    <option value="London">London</option>
                    <option value="Tokyo" disabled>
                      Tokyo (coming soon)
                    </option>
                    <option value="New York" disabled>
                      New York (coming soon)
                    </option>
                    <option value="Paris" disabled>
                      Paris (coming soon)
                    </option>
                    <option value="Singapore" disabled>
                      Singapore (coming soon)
                    </option>
                  </select>
                </label>
                <br />
                {userRole.includes("user") && (
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#4f6369",
                  }}
                >
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
                    disabled={isButtonClicked} //disable field when "create" button clicked
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                  </select>
                </label>
                )}
                {userRole.includes("user") && (
                <label
                  style={{
                    color: "#4f6369",
                  }}
                >
                  Title:
                  <input
                    ref={titleRef}
                    name="title"
                    style={{
                      width: "75%",
                      padding: "5px",
                      borderRadius: "5px",
                      margin: "8px",
                      border: "1px solid #ccc",
                    }}
                    disabled={isButtonClicked} //disable field when "create" button clicked
                  />
                </label>
                )}
                <br />
                <br />
              </form>
              {userRole.includes("user") && (
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "20%",
                  backgroundColor: "#4f6369",
                  color: "white",
                }}
                onClick={() => {
                  createItinerary();
                  setIsButtonClicked(true);
                }}
                disabled={isButtonClicked} //disable button when "create" clicked for first time
              >
                Create
              </Button>
              )}
            </div>
          <br />
          <hr></hr>
          {/*display itinerary only when button is clicked / state becomes true */}
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
              <p
                style={{
                  color: "#4f6369",
                }}
              >
                Location: {locationRef.current.value}
              </p>
              <p
                style={{
                  color: "#4f6369",
                }}
              >
                Title: {titleRef.current.value}
              </p>
              <br></br>
              {/* iterate thru array created by generateDayRows and creates div for each Day, at the same time iterates through the days so activitiesByDay can check if there are activities for each day */}
              {generateDayRows().map((day, index) => (
                <div key={index}>
                  <h5>{day}</h5>
                  {/* checks for activities associated with respective day of the iteration that generateDayRows is running, and displays them*/}
                  {/* activitiesByDay - object holding info about activities organised by day */}
                  {/* index + 1: JS index starts with 0, hence adjustment made to ensure it's checking the right day vs that of generateDayRows' iteration */}
                  {/* ? - optional chaining (to safely access properties of an object). checks if there are activities for the day of index + 1, if none, will prevent code from breaking and return undefined */}
                  {activitiesByDay[index + 1]?.map(
                    (activity, activityIndex) => (
                      // div created for each activity
                      <div
                        key={activityIndex}
                        style={{
                          color: "#4f6369",
                        }}
                      >
                        <h5>{activity.title}</h5>
                        <p>{activity.activity_type_name}</p>
                        <p>Neighbourhood: {activity.district}</p>
                        <p>Opening hours: {activity.opening_hours}</p>
                        <p>Cost: {activity.cost}</p>
                        <img
                          src={activity.image}
                          alt={activity.title}
                          width="150px"
                        />
                        <div>
                          <Button
                            onClick={() =>
                              handleDeleteActivity(
                                itinerary_id,
                                activity.activity_id
                              )
                            }
                          >
                            Remove Activity
                          </Button>
                        </div>
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
          {userRole.includes("user") && (
            <Typography
              variant="h5"
              style={{
                fontSize: "20px",
                color: "#4f6369",
                fontWeight: "bold",
              }}
            >
              Step 2
            </Typography>
          )}
          {userRole.includes("user") && (
            <Typography
              variant="h5"
              style={{
                fontSize: "28px",
                marginBottom: "20px",
                color: "#4f6369",
                fontWeight: "bold",
              }}
            >
              Add activities
            </Typography>
          )}
          <div
            className="filter-buttons"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <button
              onClick={() => handleFilterSelect("All")}
              className={`filter-button ${
                selectedFilter === "All" ? "active" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterSelect("Hotels")}
              className={`filter-button ${
                selectedFilter === "Hotels" ? "active" : ""
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => handleFilterSelect("Food & Drinks")}
              className={`filter-button ${
                selectedFilter === "Food & Drinks" ? "active" : ""
              }`}
            >
              Food & Drinks
            </button>
            <button
              onClick={() => handleFilterSelect("Things to do")}
              className={`filter-button ${
                selectedFilter === "Things to do" ? "active" : ""
              }`}
            >
              Things to Do
            </button>
            <button
              onClick={() => handleFilterSelect("Things to see")}
              className={`filter-button ${
                selectedFilter === "Things to see" ? "active" : ""
              }`}
            >
              Things to See
            </button>
          </div>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {/* prop down activities to ActivityItem.jsx for display */}
            {filteredActivities.map((item) => (
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
                  activity={activity}
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
