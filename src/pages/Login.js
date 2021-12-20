import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Login.css"
import logo from '../img/logo.svg'
import background from '../img/background.png'
import React, {useState, useRef} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import {login} from "../actions/auth";
import {TextField} from "@material-ui/core";

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
                .then(() => {
                    props.history.push("/home");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/home"/>;
    }

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

                                        <Form onSubmit={handleLogin} ref={form}>
                                            <div className="form-outline mb-4">
                                                <TextField
                                                    id="standard-textarea"
                                                    label="Tên đăng nhập"
                                                    placeholder="Tên đăng nhập"
                                                    variant="standard"
                                                    name="username"
                                                    value={username}
                                                    onChange={onChangeUsername}
                                                    required
                                                    style={{width: '100%'}}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">

                                                <TextField
                                                    id="standard-textarea1sss"
                                                    label="Mật khẩu"
                                                    placeholder="Mật khẩu"
                                                    variant="standard"
                                                    name="password"
                                                    value={password}
                                                    type="password"
                                                    onChange={onChangePassword}
                                                    required
                                                    style={{width: '100%'}}
                                                />
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">

                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    disabled={loading}>
                                                    {loading && (
                                                        <span className="spinner-border spinner-border-sm"/>
                                                    )}
                                                    Đăng nhập
                                                </button>
                                            </div>
                                            <CheckButton style={{display: "none"}} ref={checkBtn}/>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Nếu chưa có tài khoản?</p>
                                            </div>

                                        </Form>
                                        {message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        )}
                                        <a href="/register" className="btn btn-outline-danger">
                                            Đăng kí
                                        </a>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <img src={background} style={{width: "100%", height: "100%"}} alt={""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )

}

export default Login;