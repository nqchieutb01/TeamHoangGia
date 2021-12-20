import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../logo.svg'
import SvgIcon from '@mui/material/SvgIcon';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import AddBoxIcon from '@mui/icons-material/AddBox';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Button from "@mui/material/Button";
import NavBarLeft from "./NavBarLeft";

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
                {/* <Button onClick={() => history.goBack()}>Quay về</Button> */}
            </div>

            <div className='nav_c-center'>
                <ul className='nav_c-links'>
                    <li>
                        <NavLink activeClassName='li_active' to='/home'>
                            <div>
                                <HomeIcon color="primary" style={{color: "#1C1C1E"}}/>
                            </div>
                            Trang chủ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='li_active' to='/location'>
                            <div>
                                <GpsFixedIcon color="primary" style={{color: "#1C1C1E"}}/>
                            </div>
                            Địa điểm
                        </NavLink>
                    </li>
                    {
                        currentUser &&
                        <>
                            <li>
                                <NavLink activeClassName='li_active' to='/create-tour'>
                                    <div>
                                        <AddBoxIcon color="primary" style={{color: "#1C1C1E"}}/>
                                    </div>
                                    Tạo Tour
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>

            <div className='nav_c-left'>
                <NavBarLeft/>
            </div>
        </nav>
    )
}
