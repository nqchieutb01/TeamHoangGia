import React from "react";
import ReactDOM from "react-dom";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

export default function CommentBox(props) {
  const [value, setValue] = React.useState(0);

  const [comment, setComment] = React.useState(null);

  const { userId, userName, rating, text } = props.input;

  const type = props.type;

  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return type == "edit" ? (
    <Paper style={{ padding: "20px 20px", marginTop: 10 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ textAlign: "left" }}>{userName}</h4>
          <p style={{display: "flex"}}>
            <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
          </p>
          
          <p style={{ padding: "5px", textAlign: "left" }}>
            <TextField
              id="outlined-search"
              label="Review"
              fullWidth
            />
          </p>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{userName}</h4>
          <p style={{ textAlign: "left", color: "gray" }}>
            posted 1 minute ago
          </p>
          <p style={{ textAlign: "left" }}>
            <TextField
              id="outlined-read-only-input"
              label={<Rating name="read-only" value={1} readOnly />}
              defaultValue="yolo"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}
