import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import logo from '../logo.svg'
import background from '../img/background.png'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {register} from "../actions/auth";
import {ErrorMessage, Field, Formik, Form} from "formik";

export default function Register() {
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup.string()
                .required('Vui lòng điền tên đăng nhập')
                .min(3, 'Tên đăng nhập cần có ít nhất 3 ký tụ')
                .max(20, 'Tên đăng nhập không được vượt quá 20 ký tự'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .min(6, 'Mật khẩu cần có ít nhất 6 ký tự')
                .max(40, 'Mật khẩu không được vượt quá 40 ký tự'),
            confirmPassword: Yup.string()
                .required('Vui lòng nhập lại mật khẩu')
                .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại không khớp'),
        });
    }

    const handleSubmit = (data) => {
        setSuccessful(false);
        dispatch(register(data.username, data.password))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    return (
        <section className="h-100 gradient-form" style={{background: "#eee"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img
                                                src={logo}
                                                style={{
                                                    display: "block", marginLeft: "35%",
                                                    width: "70%"
                                                }} alt="logo"/>
                                            <h4 className="mt-1 mb-5 pb-1">Việt Nam Tour</h4>
                                        </div>
                                        {
                                            !successful && (
                                                <div className="register-form">
                                                    <Formik
                                                        initialValues={initialValues}
                                                        validationSchema={validationSchema}
                                                        onSubmit={handleSubmit}
                                                    >
                                                        {({resetForm}) => (
                                                            <Form>
                                                                <div className="form-group">
                                                                    <label htmlFor="username"><h6
                                                                        style={{letterSpacing: '0.1rem'}}>Tên đăng
                                                                        nhập</h6>
                                                                    </label>
                                                                    <Field name="username" type="text"
                                                                           className="form-control"
                                                                           placeholder="Tên đăng nhập"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="username"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="password"><h6
                                                                        style={{letterSpacing: '0.1rem'}}> Mật khẩu</h6>
                                                                    </label>
                                                                    <Field
                                                                        name="password"
                                                                        type="password"
                                                                        className="form-control"
                                                                        placeholder="Mật khẩu"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="password"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="confirmPassword"><h6
                                                                        style={{letterSpacing: '0.1rem'}}>Xác nhận mật
                                                                        khẩu</h6>
                                                                    </label>
                                                                    <Field
                                                                        name="confirmPassword"
                                                                        type="password"
                                                                        className="form-control"
                                                                        placeholder="Xác nhận mật khẩu"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="confirmPassword"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                <br/>
                                                                <div className="form-group">
                                                                    <button type="submit" className="btn btn-primary"
                                                                            style={{width: '30%'}}>Đăng kí
                                                                    </button>
                                                                    <br/><br/>
                                                                    <button type="button" onClick={resetForm}
                                                                            className="btn btn-warning float-right"
                                                                            style={{width: '30%'}}>Reset
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            )
                                        }

                                        {message && (
                                            <div className="form-group">
                                                <div
                                                    className={successful ? "alert alert-success" : "alert alert-danger"}
                                                    role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        )}

                                        <br/>
                                        <a href="/login" className="btn btn-outline-danger" style={{width: '30%'}}>
                                            Đăng nhập
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <img src={background} style={{width: "100%", height: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}