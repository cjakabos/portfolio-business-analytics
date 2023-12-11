import './App.css';
import React from "react";

import "./styles.css";
import {Routes, Route, Navigate} from "react-router-dom";
import MLOps from "./pages/MLOps/MLOps";

export default function App() {

    return (
        <Routes>
            <Route
                path="*"
                element={<MLOps/>}
            />
        </Routes>
    );
}

