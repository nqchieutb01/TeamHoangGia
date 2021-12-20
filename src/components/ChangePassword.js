import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Login.css"
import service from "../services/user.service"
import React from "react";
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
    const [open, setOpen] = React.useState(false);
    const initialValues = {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };
    const handleOk = () => {
        setOpen(false)
    };

    const handleNo = () => {
        setOpen(true)
    };
    const validationSchema = () => {
        return Yup.object().shape({
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .min(5, 'Mật khẩu cần có ít nhất 5 ký tự')
                .max(40, 'Mật khẩu không được vượt quá 40 ký tự')
                .test('true', 'Mật khẩu không chính xác', val => ValidPass(val) === true),
            newPassword: Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .min(5, 'Mật khẩu cần có ít nhất 5 ký tự')
                .max(40, 'Mật khẩu không được vượt quá 40 ký tự'),
            confirmPassword: Yup.string()
                .required('Nhập mật khẩu xác nhận')
                .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp'),
        });
    }
    const ValidPass = (val) => {
        if (!val) return false
        const match = bcrypt.compareSync(val, oldPassword.oldPassword);
        return match
    }

    const handleSubmit = async (data) => {
        const req = {
            password: data.newPassword
        }
        await service.updatePassword(req)
        setOpen(true)
        // console.log(JSON.stringify(data, null, 2));
    }

    return (
        <div>

            <div className="register-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        <Form>

                            <div className="form-group">
                                <label htmlFor="password"> <h5>Mật khẩu</h5> </label>
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
                                <label htmlFor="newPassword"> <h5>Mật khẩu mới</h5> </label>
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
                                <label htmlFor="confirmPassword"> <h5>Xác nhận mật khẩu</h5> </label>
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
                                <button type="submit" className="btn btn-primary">Xác nhận</button>
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
                        Bạn đã đổi mật khẩu thành công
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}> OK </Button>
                </DialogActions>
            </Dialog>

        </div>

    )

}