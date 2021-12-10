import React, {useState, useEffect} from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
export default function AddNewLocation({label}){
        return(
            <>
                    <TextField id="standard-basic" label={label} variant="standard" />
            </>
        )
}