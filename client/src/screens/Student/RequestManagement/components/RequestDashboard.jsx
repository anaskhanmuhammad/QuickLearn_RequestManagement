import React from "react";
import { NavLink } from "react-router-dom";

function RequestDashboard() {
    return (

            <div className="flex justify-center items-center flex-col  w-full h-full p-1 shadow-lg ">
                <div className="mt-5 mb-8 w-full  text-center">
                    Request Management
                </div>
                <div className="m-2 w-full  ">
                    <ul className="flex justify-between items-center w-full ">
                        <li className="w-full border border-black flex content-center items-center">
                            <NavLink
                                to="/student/RequestManagement/CreateRequest"
                                className={({ isActive }) =>
                                    `w-full h-full flex items-center justify-center hover:cursor-pointer rounded-sm p-2 ${
                                        isActive ? "bg-slate-200" : ""
                                    }`
                                }
                            >
                                Create New Request
                            </NavLink>
                        </li>
                        <li className="w-full border-black border flex content-center items-center">
                            <NavLink
                                to="/student/RequestManagement/ViewRequests"
                                className={({ isActive }) =>
                                    ` w-full h-full flex items-center justify-center hover:cursor-pointer rounded-sm p-2 ${
                                        isActive ? "bg-slate-200" : ""
                                    }`
                                }
                            >
                                Send Request
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

    );
}

export default RequestDashboard;
