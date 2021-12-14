import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import logo from '../logo.svg'
import background from '../background.png'
import React, {useState, useRef} from "react";
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
            fullname: Yup.string().required('Fullname is required'),
            username: Yup.string()
                .required('Username is required')
                .min(3, 'Username must be at least 3 characters')
                .max(20, 'Username must not exceed 20 characters'),
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
            acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
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
        console.log(JSON.stringify(data, null, 2));
    }

    const initialValues = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
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
                                            <h4 className="mt-1 mb-5 pb-1">We are Hoang Gia Team</h4>
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
                                                                    <label>Full Name</label>
                                                                    <Field name="fullname" type="text"
                                                                           className="form-control"/>
                                                                    <ErrorMessage
                                                                        name="fullname"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="username"> Username </label>
                                                                    <Field name="username" type="text"
                                                                           className="form-control"/>
                                                                    <ErrorMessage
                                                                        name="username"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="email"> Email </label>
                                                                    <Field name="email" type="email"
                                                                           className="form-control"/>
                                                                    <ErrorMessage
                                                                        name="email"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

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

                                                                <div className="form-group form-check">
                                                                    <Field
                                                                        name="acceptTerms"
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                    />
                                                                    <label htmlFor="acceptTerms"
                                                                           className="form-check-label">
                                                                        I have read and agree to the Terms
                                                                    </label>
                                                                    <ErrorMessage
                                                                        name="acceptTerms"
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <button type="submit" className="btn btn-primary">Register</button>
                                                                    <button type="button" onClick={resetForm} className="btn btn-warning float-right">Reset</button>
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
                                        <a href="/login" className="btn btn-outline-danger">
                                            Login
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