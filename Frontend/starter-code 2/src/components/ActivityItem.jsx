import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
// import ActivityContext from "../context/ActivityContext";

const ActivityItem = (props) => {
  return (
    <>
    <br />
    <br />
      <Card
        sx={{
          width: 400,
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="360" src={props.image} />
          <CardContent>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body1">
              Neighbourhood: {props.district}
            </Typography>
            <Typography variant="body1">Price: {props.cost}</Typography>
            <Button
              onClick={() => setShowModal(true)}
              variant="outlined"
              sx={{
                width: "90px",
                color: "black",
                backgroundColor: "white",
                borderColor: "black",
                justifyItems: "center",
                margin: "10px 5px",
              }}
            >
              details
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              variant="outlined"
              sx={{
                width: "120px",
                color: "black",
                backgroundColor: "white",
                borderColor: "black",
                justifyItems: "center",
                margin: "10px 5px",
              }}
            >
              add to trip
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ActivityItem;
