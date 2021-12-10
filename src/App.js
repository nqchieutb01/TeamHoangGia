import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleCocktail from "./pages/SingleCocktail";
import CreateTour from "./pages/CreateTour";
import Error from "./pages/Error";

// import components
import Navbar from "./components/Navbar";
import SettingAccount from "./pages/SettingAccount";
import Location from "./pages/Location";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTour from "./pages/MyTour";
import Admin from "./pages/Admin";

function App() {
    return (
        <>
            <Router>

                <div>

                    <Switch>
                        <Route path='/admin'>
                            <Admin/>
                        </Route>
                        <Route exact path="/home">
                            <Navbar/>
                            <Home/>
                        </Route>
                        <Route path="/about">
                            <Navbar/>
                            <About/>
                        </Route>

                        <Route path="/cocktail/:id">
                            <Navbar/>
                            <SingleCocktail/>
                        </Route>

                        <Route path="/create-tour">
                            <Navbar/>
                            <CreateTour/>
                        </Route>

                        <Route path="/setting-account">
                            <Navbar/>
                            <SettingAccount/>
                        </Route>
                        <Route path="/location">
                            <Navbar/>
                            <Location/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/registration">
                            <Register/>
                        </Route>
                        <Route path="/my-tour">
                            <Navbar/>
                            <MyTour/>
                        </Route>
                        <Route path="*">
                            <Navbar/>
                            <Error/>
                        </Route>

                    </Switch>
                </div>
            </Router>

        </>

    );
}

export default App;