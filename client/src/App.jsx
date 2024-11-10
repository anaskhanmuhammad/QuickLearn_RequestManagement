import React from "react";
import { Outlet } from "react-router-dom";
// import contextProvider from "./store/store";

function App() {
    return (

            <div>
                <Outlet></Outlet>
            </div>

    );
}

export default App;
