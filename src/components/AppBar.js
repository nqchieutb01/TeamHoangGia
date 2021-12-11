import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {NavLink, useHistory} from "react-router-dom";
import Button from '@mui/material/Button';
import {useGlobalContext} from "../context";
import {useCallback, useEffect, useRef, useState} from "react";
import BasicModal from "./BasicModal";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/auth";

export default function AppBar_v1() {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { user: testState } = useSelector((state) => state);

    const {openModal} = useGlobalContext()
    const {auth,setAuth} = useGlobalContext()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        console.log(testState)
        console.log(currentUser)
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
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    return (
                <Toolbar style={{background:"white"}}>
                    <BasicModal/>
                    <IconButton
                        size="large"
                        edge="start"
                        // color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    {currentUser && (
                        <div>
                            <AccountCircle />
                            <Button
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMenu}
                                // color="inherit"
                            >
                                <MenuIcon />
                                {/*Dash Board*/}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                // anchorOrigin={{
                                //     vertical: 'top',
                                //     horizontal: 'right',
                                // }}
                                // keepMounted
                                // transformOrigin={{
                                //     vertical: 'top',
                                //     horizontal: 'right',
                                // }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                 <MenuItem onClick={routeChange_setting_account}>My account</MenuItem>
                                 <MenuItem onClick={logOut}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {
                        !currentUser &&
                        <NavLink to='/login' >
                            <Button variant="contained" style={{marginRight:'0%'}}>Login</Button>
                        </NavLink>
                    }
                    {
                        currentUser &&  <NavLink to='/admin' >
                            <Button variant="contained" style={{marginRight:'0%'}}>Admin</Button>
                        </NavLink>
                    }

                </Toolbar>
    );
}