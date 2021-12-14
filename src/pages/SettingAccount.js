import React, {useState, useEffect} from 'react'
import "./settingAccount.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from "react-redux";
import service from "../services/user.service"
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingAccount() {
    const [test, setTest] = useState("tessst")
    const [open, setOpen] = React.useState(false);
    const [check, setcheck] = React.useState({
        bool: false,
        message: null,
    });
    let checkRequired = false
    const [user, setUser] = useState({
        firstname: null,
        lastname: null,
        phonenumber: null,
        role: null,
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user: currentUser} = useSelector((state) => state.auth);

    const fetchUser = async () => {
        try {
            const tmp = await service.getUserInfo()
            setUser(tmp.data)
            console.log(tmp.data)
            console.log("ssss")
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    const handleClickOpen = () => {
        console.log("test submit")
        checkRequired = false
        required(user.phonenumber, "phonenumber must be not null")
        required(user.lastname, "lastname must be not null")
        required(user.firstname, "firstname Name of Tour must be not null")
        if (!checkRequired) {
            setOpen(true);

        }


    };
    const handleOk = () => {
        setcheck({bool: false});
    };

    const handleYes = () => {
        //changeProfile
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
    const changeProfile = () => {

    }



    return (
        <div className="bootstrap-inside">
            <div className="container rounded bg-white mt-5">

                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img src="https://i.imgur.com/0eg0aG0.jpg"
                                 className="rounded-circle mt-5" width="90"/>
                            <span
                                className="font-weight-bold">{user.firstname}</span>
                            <span
                                className="text-black-50">{user.phonenumber}</span>
                            <span>United States</span>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex flex-row align-items-center back"><i
                                    className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                    <h6>Back to home</h6>
                                </div>
                                <button className="btn btn-primary profile-button" >change password</button>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <input type="text" className="form-control"
                                           value={user.firstname}
                                           onChange={(e) => setUser({...user, firstname: e.target.value})}
                                    />
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <input type="text" className="form-control"
                                           value={user.lastname}
                                           onChange={(e) => setUser({...user, lastname: e.target.value})}
                                    />
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <input type="text" className="form-control"
                                           value={user.phonenumber}
                                           onChange={(e) => setUser({...user, phonenumber: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <input type="text"
                                           className="form-control"
                                           value={user.role}
                                    />
                                </div>
                            </div>

                            <div className="mt-5 text-right">
                                <button className="btn btn-primary profile-button" type="button"  onClick={handleClickOpen} >Save Profile</button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

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
    )

}