import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function LetterAvatars({name}) {
    return (
        <Stack direction="row" spacing={2}>
            {/*<Avatar>{name}</Avatar>*/}
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{name}</Avatar>
            {/*<Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>*/}
        </Stack>
    );
}