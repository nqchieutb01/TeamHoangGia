import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import logo from '../logo.svg'
import background from '../background.png'
import {NavLink} from "react-router-dom";
import React, {useState, useRef} from "react";

import {useDispatch, useSelector} from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import {register} from "../actions/auth";
import Link from "react-router-dom/es/Link";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default function Register() {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };


    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);
        console.log(username,password)
        form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, password))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        // }
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
                                        {/*<Signup/>*/}
                                        {/*<br/>*/}
                                        <Form onSubmit={handleRegister} ref={form}>
                                            {!successful && (
                                                <div>
                                                    <div className="form-group">
                                                        <label htmlFor="username">Username</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="username"
                                                            value={username}
                                                            onChange={onChangeUsername}
                                                            validations={[required, vusername]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="email"
                                                            value={email}
                                                            onChange={onChangeEmail}
                                                            validations={[required, validEmail]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            name="password"
                                                            value={password}
                                                            onChange={onChangePassword}
                                                            validations={[required, vpassword]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Sign Up</button>
                                                    </div>
                                                </div>
                                            )}
                                            <CheckButton style={{display: "none"}} ref={checkBtn}/>
                                        </Form>
                                        {message && (
                                            <div className="form-group">
                                                <div
                                                    className={successful ? "alert alert-success" : "alert alert-danger"}
                                                    role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        )}
                                        <a href="/login" className="btn btn-outline-danger">
                                            Login
                                        </a>
                                        {/*<Link activeClassName='li_active' className="btn btn-outline-danger"*/}
                                        {/*         to='/login'>Login</Link>*/}
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