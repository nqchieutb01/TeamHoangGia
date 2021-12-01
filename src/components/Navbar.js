import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../logo.svg'
import AppBar_v1 from "./AppBar";
import SvgIcon from '@mui/material/SvgIcon';
// import 'bootstrap/dist/css/bootstrap.min.css';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

export default function navbar() {

    return (
        <nav className='nav_cbar'>
            <div className='nav_c-left'>
                <Link to='/'>
                    <img src={logo} alt='Logo' className='logo'/>
                </Link>
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
                        <NavLink activeClassName='li_active' to='/review'>review</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='li_active' to='/about'>about</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='li_active' to='/create-tour'>Create Tour</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='li_active' to='/login'>Login</NavLink>
                    </li>
                </ul>

            </div>

            <div className='nav_c-left'>
                <AppBar_v1/>
            </div>
        </nav>
    )
}
