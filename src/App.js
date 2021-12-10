import React, {useCallback, useState} from "react";
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
import LocationPage from "./pages/LocationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTour from "./pages/MyTour";
import Admin from "./admin/Admin";
import Login_test from "./test/login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {history} from "./helpers/history";
import {clearMessage} from "./actions/message";
import {logout} from "./actions/auth";
import EventBus from "./common/EventBus";
import SingleLocation from "./pages/LocationSinglePage";

function App() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const {user: currentUser} = useSelector((state) => state.auth);
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
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);
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
                            <SingleLocation/>
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
                            <LocationPage/>
                        </Route>
                        <Route path="/login">
                            {/*<Login/>*/}
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