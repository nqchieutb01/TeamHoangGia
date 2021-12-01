import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useHistory} from "react-router-dom";
import Button from '@mui/material/Button';
import {useGlobalContext} from "../context";
import {useEffect, useRef, useState} from "react";

export default function AppBar_v1() {

    // const [auth, setAuth] = useState(true);
    const {openModal} = useGlobalContext()
    const {auth,setAuth} = useGlobalContext()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();

    const routeChange_setting_account = () =>{
        let path = `setting-account`;
        history.push(path);
        setAnchorEl(null);
    }
    const routeChange_profile = () =>{
        let path = `profile`;
        history.push(path);
        setAnchorEl(null);
    }
    return (

                <Toolbar style={{background:"white"}}>
                    <Button variant="contained" color="primary" onClick={openModal}>
                        Your Tour
                    </Button>
                    <IconButton
                        size="large"
                        edge="start"
                        // color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color:"black"}}>*/}
                    {/*    Photos*/}
                    {/*</Typography>*/}
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                // color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={routeChange_profile}>Profile</MenuItem>
                                <MenuItem onClick={routeChange_setting_account}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                // color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={routeChange_profile}>Profile</MenuItem>
                                <MenuItem onClick={routeChange_setting_account}>My account</MenuItem>
                                <MenuItem onClick={routeChange_setting_account}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={auth}
                                    onChange={handleChange}
                                    aria-label="login switch"
                                />
                            }
                            label={auth ? 'Logout' : 'Login'}
                            style={{color:"black"}}
                        />
                    </FormGroup>

                </Toolbar>
    );
}