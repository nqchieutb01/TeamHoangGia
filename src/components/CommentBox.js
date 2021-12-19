import React from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import SERVICE from "../services/tour.service";
import Button from "@mui/material/Button";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import moment from 'moment';


import TimeAgo from "./TimeAgo";

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function CommentBox(props) {
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const type = props.type;
  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
    
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    const temp = {
      tourId: props.tour,
      userId: props.input.userId,
      star: value,
      comment: comment,
    };
    if (temp.star || temp.comment) {
      await SERVICE.postComment(temp);
      window.location.reload();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleYes = async () => {
    await SERVICE.deleteComment(props.input.reviewid);
    setOpen(false);
    window.location.reload();
  };

  const handleNo = () => {
    setOpen(false);
  };

  const deleteButton = (check) => {
    if (check) {
      return (
        <Link className="btn btn-primary btn-details" onClick={handleClickOpen}>
          Delete
        </Link>
      );
    }
  };

  return type == "edit" ? (
    <Paper style={{ padding: "20px 20px", marginTop: 10 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ textAlign: "left" }}>{props.input.name}</h4>
          <p style={{ display: "flex" }}>
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
              id="outlined-helperText"
              label="Write a review"
              onChange={handleChange}
              fullWidth
            />
          </p>
          <p>
            <Link
              className="btn btn-primary btn-details"
              onClick={handleSubmit}
            >
              Post
            </Link>
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
          <h4 style={{ margin: 0, textAlign: "left" }}>
            {props.input.user.firstname + " " + props.input.user.lastname}
          </h4>
          <p style={{ textAlign: "left", color: "gray" }}>
            <TimeAgo date={props.input.user.createdAt}/>
          </p>
          <p>
            {moment(props.input.user.createdAt).fromNow()}
          </p>
          <p style={{ textAlign: "left" }}>
            <TextField
              id="outlined-read-only-input"
              label={
                <Rating name="read-only" value={props.input.rating} readOnly />
              }
              defaultValue={props.input.comment}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </p>
          <p>{deleteButton(props.delete)}</p>
          <p>
            <Dialog
              open={open}
              // TransitionComponent={Transition}
              keepMounted
              onClose={handleNo}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Bạn có chắc chắn muốn xóa bình luận này không ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleNo}>Không</Button>
                <Button onClick={handleYes}>Có</Button>
              </DialogActions>
            </Dialog>
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}
