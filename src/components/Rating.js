import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating(props) {
  const [value, setValue] = React.useState(props.default ? props.default : 2);

  return (
    <Box>
      {props.type == "controlled" ? (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      ) : (
        <Rating name="read-only" value={value} readOnly />
      )}
    </Box>
  );
}

