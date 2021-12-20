import { Avatar } from "@material-ui/core";
import * as React from "react";
import * as Color from '@mui/material/colors';

export default function Ava(props) {
  const color = [
    "primary.main",
    "secondary.main",
    "error.main",
    "warning.main",
    "info.main",
    "success.main",
    "text.primary",
    "text.secondary",
  ];

  const size = color.length;

  const getColor = props.id ? color[props.id % size] : color[0];
  console.log(getColor);
  if (props.input) {
    return (
      <Avatar style={{ fontWeight: "normal" }} sx={{ bgcolor: { getColor } }}>
        {props.input[0].toUpperCase()}
      </Avatar>
    );
  } else {
    return (
      <Avatar style={{ fontWeight: "normal" }} sx={{ bgcolor: { getColor } }}>
        0
      </Avatar>
    );
  }
}
