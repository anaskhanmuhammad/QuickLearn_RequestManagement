import React from "react";
import { Outlet } from "react-router-dom";

import RequestDashboard from "./components/RequestDashboard";

function RequestManagement() {
    return (
        <div className="w-5/6 ml-[16.667%] h-full">
          
            <RequestDashboard/>
            <Outlet></Outlet>
        </div>
    );
}

export default RequestManagement;
