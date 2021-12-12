import * as React from 'react';
import PropTypes from 'prop-types';
import SwappableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import User from "./User";
import {useSelector} from "react-redux";
import LocationChart from "./LocationChart";
import ChartsPage from "./LocationChart";

function TabPanel(props) {

    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Admin() {
    const {user: currentUser} = useSelector((state) => state.auth);
    console.log(currentUser)
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div style={{marginTop: '3%'}}>
            <Box sx={{bgcolor: 'background.paper', width: '50%'}} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Users" {...a11yProps(0)} />
                        <Tab label="Locations" {...a11yProps(1)} />
                        <Tab label="Tours" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwappableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <User/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        {/*<LocationChart/>*/}
                        <ChartsPage/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Item Three
                    </TabPanel>
                </SwappableViews>
            </Box>
        </div>

    );
}
