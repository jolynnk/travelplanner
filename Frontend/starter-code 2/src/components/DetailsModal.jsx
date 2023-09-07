import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

const DetailsModal = (props) => {
  return (
    <>
      <Dialog
        onClose={() => props.setShowModal(false)}
        open={props.showModal}
        maxWidth="xl"
        fullWidth
      >
        <Button
          onClick={() => props.setShowModal(false)}
          variant="outlined"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "10px",
            color: "black",
            backgroundColor: "white",
            borderColor: "black",
            justifyItems: "center",
            margin: "10px auto",
            zIndex: 1, // to ensure it appears above other content
          }}
        >
          X
        </Button>
        <DialogTitle sx={{ textAlign: "center", marginTop: "20px" }}>
          <h3>{props.title}</h3>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              minWidth: 500,
              width: "100%",
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            <br></br>
            <img
              src={props.image}
              alt={props.title}
              style={{
                maxWidth: "20%",
                height: "auto",
                margin: "0 auto",
                display: "block",
              }}
            />
            <br />
            <p>
              <strong>Description:</strong> {props.description}
            </p>
            <p>
              <strong>Price:</strong> {props.cost}
            </p>
            <p>
              <strong>Rating:</strong> {props.ratings}
            </p>
            <p>
              <strong>Address:</strong> {props.address}
            </p>
            {/* <Button onClick={() => props.setShowModal(false)}>
              ADD TO TRIP
            </Button> */}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailsModal;
