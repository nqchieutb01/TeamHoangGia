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
import Review from "./pages/Review";
import Login from "./components/Login";
import Modal from "./components/Modal_test";
import ModalCocktail from "./components/ModalCocktail";
import {useGlobalContext} from "./context";

function App() {
    const isModalOpen = useGlobalContext()
    return (
        <Router>
            <Navbar/>
            {isModalOpen ? <Modal/> : <></>}
            {/*<Modal/>*/}
            <div>
                <Switch>
                    <Route exact path="/home">
                        <Home/>
                    </Route>

                    <Route path="/about">
                        <About/>
                    </Route>

                    <Route path="/cocktail/:id">
                        <SingleCocktail/>
                    </Route>

                    <Route path="/create-tour">
                        <CreateTour/>
                    </Route>

                    <Route path="/setting-account">
                        <SettingAccount/>
                    </Route>
                    <Route path="/review">
                        <Review/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="*">
                        <Error/>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

export default App;