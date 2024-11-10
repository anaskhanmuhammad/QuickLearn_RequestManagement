import { useContext } from "react";
// import { context } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const ProtectedRoute = ({allowedUserType})=> {
    // const {userType} = useContext(context);
    const token = localStorage.getItem("token"); 
    if (!token) {
        // return <Navigate to="/" />; // Redirect to login if no token exists
    }

    const decodedToken = jwtDecode(token);

    console.log(decodedToken?.userType, allowedUserType);

    if (decodedToken?.userType !== allowedUserType) {
        alert("Login First");
        return <Navigate to="/" replace />;
    }

    return<><Outlet></Outlet></>
}

export default ProtectedRoute;