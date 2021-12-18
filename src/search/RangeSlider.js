import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 400,
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{width:'100%'}}>
            <Slider
                defaultValue={1000000}
                getAriaValueText={valuetext}
                // aria-labelledby="discrete-slider-small-steps"
                step={100000}
                marks
                min={0}
                max={1000000}
                valueLabelDisplay="auto"
            />
        </div>
    );
}
