import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const [value, setValue] = React.useState([0, 1000]);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    return (
      // <section className='section-center_c'>
          <>
          <Box sx={{ width: "100 %" }}>
              <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
              />
          </Box>
          </>
      // {/*</section>*/}


    );
}