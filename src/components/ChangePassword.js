import 'bootstrap/dist/css/bootstrap.min.css';
import "../pages/Login.css"
import logo from '../logo.svg'
import background from '../background.png'
import service from "../services/user.service"
import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {ErrorMessage, Field, Formik, Form} from "formik";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

const bcrypt = require('bcryptjs')
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangePassword(oldPassword) {
    const {message} = useSelector(state => state.message);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const initialValues = {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };
    console.log("assssssssss")
    console.log(oldPassword)
    const handleOk = () => {
        setOpen(false)
    };

    const handleNo = () => {
        setOpen(true)
    };
    const validationSchema = () => {
        return Yup.object().shape({
            password: Yup.string()
                .required('Password is required')
                .min(1, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters')
                .test('true', 'Mật khẩu không chính xác', val => ValidPass(val) === true),
            newPassword: Yup.string()
                .required('Password is required')
                .min(1, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('newPassword'), null], 'Confirm Password does not match'),
        });
    }
    const ValidPass = (val) => {
        if (!val) return false
        const match = bcrypt.compareSync(val, oldPassword.oldPassword);
        return match
    }

    const handleSubmit = async (data) => {
        console.log("==========")
        const ss = data.newPassword
        const req = {
            password: data.newPassword
        }
        console.log(data.newPassword)
        console.log(req)
        await service.updatePassword(req)
        //setSuccessful(true)
        setOpen(true)
        console.log(JSON.stringify(data, null, 2));

    }

    return (

       /* <div className="card-body p-md-5 mx-md-4">
       */
        <div className="col-md-6 border-right">

            <div className="register-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                     className="col-md-2"
                >
                    {
                        <Form>

                            <div className="form-group">
                                <label htmlFor="password"> Password </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword"> New Password </label>
                                <Field
                                    name="newPassword"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword"> Confirm
                                    Password </label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <br></br>
                                <button type="submit" className="btn btn-primary">xác nhận</button>
                            </div>
                        </Form>
                    }
                </Formik>
            </div>

            <br/>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleNo}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        bạn đã đổi mật khẩu thành công
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}> OK </Button>
                </DialogActions>
            </Dialog>

        </div>

    )

}