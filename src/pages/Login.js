import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import logo from '../logo.svg'
import background from '../background.png'
import {NavLink} from "react-router-dom";
import React from "react";
export default function Login(){
    return (
        <section className="h-100 gradient-form" style={{background : "#eee"}} >

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
                                                style={{ display:"block",marginLeft:"35%" ,
                                                    width: "70%"}} alt="logo"/>
                                                <h4 className="mt-1 mb-5 pb-1">We are Hoang Gia Team</h4>
                                        </div>

                                        <form>
                                            <p>Please login to your account</p>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example11" className="form-control"
                                                       placeholder="Phone number or email address"/>
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example22" className="form-control"/>
                                                <label className="form-label" htmlFor="form2Example22">Password</label>
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" style={{width:'80%'}}
                                                    type="button">Log in
                                                </button>
                                                <br/>
                                                <a className="text-muted" href="#!">Forgot password?</a>

                                            </div>


                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                {/*<button type="button" className="btn btn-outline-danger">*/}
                                                {/*    Create new*/}
                                                {/*</button>*/}
                                                <NavLink activeClassName='li_active'  className="btn btn-outline-danger" to='/registration'>Register</NavLink>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <img src={background} style={{width:"100%" , height:"100%"}}></img>
                                    {/*<div className="text-white px-3 py-4 p-md-5 mx-md-4">*/}
                                    {/*    <h4 className="mb-4">We are more than just a company</h4>*/}
                                    {/*    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing*/}
                                    {/*        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut*/}
                                    {/*        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
                                    {/*        aliquip ex ea commodo consequat.</p>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )

}