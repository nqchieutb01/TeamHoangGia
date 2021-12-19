import React, {useCallback} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SingleCocktail from "./pages/SingleCocktail";
import CreateTour from "./pages/CreateTour";
import Error from "./pages/Error";

import Navbar from "./components/Navbar";
import SettingAccount from "./pages/SettingAccount";
import LocationPage from "./pages/LocationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTour from "./pages/MyTour";
import Admin from "./admin/Admin";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {history} from "./helpers/history";
import {clearMessage} from "./actions/message";
import {logout} from "./actions/auth";
import EventBus from "./common/EventBus";
import SingleLocation from "./pages/LocationSinglePage";

function App() {

    const {user: currentUser} = useSelector((state) => state.auth);
    console.log(currentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/home">
                    <Navbar/>
                    <Home/>
                </Route>
                <Route exact path="/">
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

                <Route path="/location/:id">
                    <Navbar/>
                    <SingleLocation/>
                </Route>

                <Route path="/tour/:id">
                    <Navbar/>
                    <SingleCocktail/>
                </Route>

                <Route path="/location">
                    <Navbar/>
                    <LocationPage/>
                </Route>

                <Route path="/login">
                    <Navbar/>
                    <Login/>
                </Route>
                <Route path="/register">
                    <Navbar/>
                    <Register/>
                    {/*<Test/>*/}
                </Route>

                {
                    currentUser &&
                    (
                        currentUser.role ==='admin' &&
                        <Route path='/admin'>
                            <Navbar/>
                            <Admin/>
                        </Route>
                    )
                }
                {
                    currentUser && <>
                        <Route path="/create-tour">
                            <Navbar/>
                            <CreateTour/>
                        </Route>
                        <Route path="/setting-account">
                            <Navbar/>
                            <SettingAccount/>
                        </Route>
                        <Route path="/my-tour">
                            <Navbar/>
                            <MyTour/>
                        </Route>
                    </>
                }


                <Route path="*">
                    <Navbar/>
                    <Error/>
                </Route>
            </Switch>
        </Router>

    );
}

export default App;