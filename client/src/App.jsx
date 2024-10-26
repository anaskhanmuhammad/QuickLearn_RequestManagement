import React from "react";
import { Outlet } from "react-router-dom";
import contextProvider from "./store/store";

function App() {
    return (
        // <contextProvider>
            <div>
                <Outlet></Outlet>
            </div>
        // </contextProvider>
    );
}

export default App;
