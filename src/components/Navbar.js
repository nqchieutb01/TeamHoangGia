import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../logo.svg'
import AppBar_v1 from "./AppBar";
import SvgIcon from '@mui/material/SvgIcon';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, useHistory} from "react-router-dom";

import AddBoxIcon from '@mui/icons-material/AddBox';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stack from "@mui/material/Stack";

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

export default function Navbar() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user: currentUser} = useSelector((state) => state.auth);
    const history = useHistory();

    return (
        <nav className='nav_cbar'>
            <div className='nav_c-left'>
                <Link to='/'>
                    <img src={logo} alt='Logo' className='logo'/>
                </Link>

                    <Button onClick={() => history.goBack()} >Go Back</Button>
            </div>

            <div className='nav_c-center'>
                <ul className='nav_c-links'>
                    <li>
                        <NavLink activeClassName='li_active' to='/home'>
                            <div>
                                <HomeIcon color="primary" style={{color: "#1C1C1E"}}/>
                            </div>
                            home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='li_active' to='/location'>
                            <div>
                                <GpsFixedIcon color="primary" style={{color: "#1C1C1E"}}/>
                            </div>
                            Location
                        </NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink activeClassName='li_active' to='/about'>about</NavLink>*/}
                    {/*</li>*/}
                    {
                        currentUser &&
                        <>
                            <li>
                                <NavLink activeClassName='li_active' to='/create-tour'>
                                    <div>
                                        <AddBoxIcon color="primary" style={{color: "#1C1C1E"}}/>
                                    </div>
                                    Create Tour
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName='li_active' to='/my-tour'>
                                    <div>
                                        <AddBoxIcon color="primary" style={{color: "#1C1C1E"}}/>
                                    </div>
                                    My Tour
                                </NavLink>
                            </li>
                        </>
                    }

                    {/*<li>*/}
                    {/*    <NavLink activeClassName='li_active' to='/login'>Login</NavLink>*/}
                    {/*</li>*/}

                </ul>

            </div>

            <div className='nav_c-left'>
                <AppBar_v1/>
            </div>
        </nav>
    )
}
