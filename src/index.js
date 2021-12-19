import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import store from "./store";

import { Provider } from "react-redux";

import TimeAgo from "javascript-time-ago";

import vi from "javascript-time-ago/locale/vi.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(vi);
TimeAgo.addLocale(ru);

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <Provider store={store}>
                <App />
            </Provider>
            {/*<App />*/}
        </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

