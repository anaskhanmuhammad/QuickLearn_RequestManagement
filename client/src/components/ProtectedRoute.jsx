import { useContext } from "react";
import { context } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({allowedUserType})=> {
    const {userType} = useContext(context);

    console.log(userType, allowedUserType);

    if (userType !== allowedUserType) {
        alert("Login First");
        return <Navigate to="/" replace />;
    }

    return<><Outlet></Outlet></>
}

export default ProtectedRoute;