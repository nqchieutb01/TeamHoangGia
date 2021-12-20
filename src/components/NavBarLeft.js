import * as React from 'react';
import {useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {NavLink, useHistory} from "react-router-dom";
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/auth";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import {alpha, styled} from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {useGlobalContext} from "../context";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
export default function NavBarLeft() {

    const {user: currentUser} = useSelector((state) => state.auth);

    const {user} = useGlobalContext()
    // console.log(currentUser)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();

    const routeSettingAccount = () => {
        history.push('/setting-account');
        setAnchorEl(null);
    }

    const routeAdmin = () => {
        if (currentUser) {
            if (currentUser.role === 'admin') {
                history.push('/admin');
                setAnchorEl(null);
            }
        }
    }

    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
        setAnchorEl(null);
        history.push('/home')
    }, [dispatch]);
    return (
        // <Toolbar style={{background: "white"}}>
        <>
            <IconButton
                size="large"
                edge="start"
                // color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
            >
            </IconButton>
            {currentUser && (
                <div>
                    <Stack direction="row" spacing={10}>
                        <div>
                            <Stack direction="row" spacing={2}>
                                <Avatar> {(user.firstname !== null && user.firstname !== undefined && user.firstname.length > 0) ? user.firstname[0].toUpperCase() : 'N'}</Avatar>
                                <h6 style={{textAlign: "left", letterSpacing: "0.05rem"}}>
                                    {(user.firstname + " " + user.lastname) !== "null null"
                                        ? (user.firstname + " " + user.lastname).substr(0, 15)
                                        : "Người dùng"}
                                    <br/>
                                    <p style={{color: 'red'}}>Role: {currentUser.role}</p>
                                </h6>
                            </Stack>
                        </div>

                        <Button
                            id="demo-customized-button"
                            aria-controls="demo-customized-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon/>}
                        >
                            Menu
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}

                        >
                            <MenuItem onClick={routeSettingAccount}>
                                <ContactPageIcon/>
                                Tài khoản của tôi
                            </MenuItem>
                            <MenuItem onClick={routeAdmin} disableRipple>
                                <AdminPanelSettingsIcon/>
                                Admin
                            </MenuItem>
                            <Divider sx={{my: 0.5}}/>

                            <MenuItem onClick={logOut}>
                                <LogoutIcon/>
                                Đăng Xuất
                            </MenuItem>
                        </StyledMenu>
                    </Stack>


                </div>
            )}
            {
                !currentUser &&
                (<NavLink to='/login'>
                    <Button variant="contained" style={{marginRight: '0%'}}>Đăng nhập</Button>
                </NavLink>)
            }
            {/*// </Toolbar>*/}
        </>
    );
}