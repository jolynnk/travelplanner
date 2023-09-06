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
            {props.image}
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
							{props.image.map((img, idx) => (
								<img
									key={idx}
									src={`/${img}`}
									style={{ width: '300px', margin: '5px' }}
								/>
							))}
						</div> */}

            <br />
            <p>
              <strong>Description:</strong> {props.description}
            </p>
            <p>
              <strong>Price:</strong> {props.cost}
            </p>
            <p>
              <strong>Category:</strong> {props.district}
            </p>
            <p>
              <strong>Subcategory:</strong> {props.address}
            </p>
            <Button onClick={() => props.setShowModal(false)}>ADD TO TRIP</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailsModal;
