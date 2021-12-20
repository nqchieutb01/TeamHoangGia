import React, {useEffect, useState} from 'react'
import "../css/settingAccount.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import service from "../services/user.service"
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import MyTour from "./MyTour";
import ChangePassword from "../components/ChangePassword"
import {useSelector} from "react-redux";
import {useGlobalContext} from "../context";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingAccount() {
    const {clickUser,setClickUser} = useGlobalContext()
    const {user, setUser,password, setPassword} = useGlobalContext()
    const [open, setOpen] = React.useState(false);
    const [changePassword, setChangePassword] = React.useState(false);
    // const [user, setUser] = useState({
    //     firstname: null,
    //     lastname: null,
    //     phonenumber: null,
    //     role: null,
    // })
    // const [password, setPassword] = React.useState(false);
    const [check, setcheck] = React.useState({
        bool: false,
        message: null,
    });
    let checkRequired = false
    // const [user, setUser] = useState({
    //     firstname: null,
    //     lastname: null,
    //     phonenumber: null,
    //     role: null,
    // })
    // const fetchUser = async () => {
    //     try {
    //         const tmp = await service.getUserInfo()
    //         setUser(tmp.data)
    //         setPassword(tmp.data.password)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(async () => {
    //     fetchUser().catch((e)=>console.log(e))
    // }, [])

    const handleClickOpen = () => {
        checkRequired = false
        // required(user.phonenumber, "phonenumber must be not null")
        required(user.lastname, "Vui lòng điền tên đệm")
        required(user.firstname, "Vui lòng điền họ")
        if (!checkRequired) {
            setOpen(true);

        }
    };
    const handleOk = () => {
        setcheck({bool: false});
    };

    const handleYes = () => {
        handleChangeProfile().catch((e)=>console.log(e))
        setClickUser(!clickUser)
        setOpen(false);
    };

    const handleNo = () => {
        setOpen(false);
    };
    const required = (value, message) => {
        if (!value) {
            checkRequired = true
            setOpen(false)
            setcheck({bool: true, message: message})
            console.log(message)
        }
    }
    const handleChangeProfile = async () => {
        try {
            await service.updateInfo(user)
        } catch (e) {
            console.log(e)
        }
    }

    const handleClickChangePassword = () => {
        setChangePassword(!changePassword)
    }

    return (
        <div class="row_c">
            <div className="left_c">

            </div>
            <div className="main_c">
                <div style={{width: '50%', margin: '0 auto'}}>
                    <h5>Họ</h5>
                    <input type="text" className="form-control" placeholder="Họ"
                           value={user.lastname}
                           onChange={(e) => setUser({...user, lastname: e.target.value})}
                    />
                    <h5>Tên Đệm</h5>
                    <input type="text" className="form-control" placeholder="Tên"
                           value={user.firstname}
                           onChange={(e) => setUser({...user, firstname: e.target.value})}
                    />
                    <h5>Số Điện Thoại</h5>
                    <input type="text" className="form-control" placeholder="0123456789"
                           value={user.phonenumber}
                           onChange={(e) => setUser({...user, phonenumber: e.target.value})}
                    />
                    <h5>Vai Trò</h5>
                    <input type="text"
                           className="form-control" placeholder="role"
                           value={user.role}
                    />
                    <br/>
                    <button className="btn btn-primary profile-button" type="button"
                            onClick={handleClickOpen}> Lưu thông tin
                    </button>
                    <br/> <br/> <br/>
                    <button className="btn btn-primary profile-button" onClick={handleClickChangePassword}>
                        Đổi mật khẩu
                    </button>
                    <br/><br/><br/>

                    {
                        changePassword && (
                            <ChangePassword oldPassword={password}/>
                        )
                    }
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleNo}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Bạn có chắc chắn muốn thêm lưu thay đổi không ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNo}>Không</Button>
                            <Button onClick={handleYes}>Có</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={check.bool}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleNo}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {check.message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleOk}> OK </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <br/> <br/>
                <h1>Tour của tôi</h1>
                <div className="underline"></div>
                <MyTour/>
            </div>
            <div className="right_c">
            </div>

        </div>
    )

}