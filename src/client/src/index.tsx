import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from './App';
import './styles/index.css';
import './styles/css/style.css';



async function init() {
    const container = document.getElementById('root')

    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>,
        container
    )

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    /// /
    //reportWebVitals()
}

init()
