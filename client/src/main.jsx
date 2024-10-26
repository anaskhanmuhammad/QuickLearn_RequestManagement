import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Student from "./screens/Student/Student";
import Teacher from "./screens/Teacher/Teacher";
import Signup from "./screens/Auth/Signup";
import Login from "./screens/Auth/Login";
import BridgingAlumniAndStudents from "./screens/Student/BridgingAlumniAndStudents/BridgingAlumniAndStudents";
import ProfileAndPersonalization from "./screens/Student/ProfileAndPersonalization/ProfileAndPersonalization";
import ProgressTrackingAndAnalytics from "./screens/Student/ProgressTrackingAndAnalytics/ProgressTrackingAndAnalytics";
import RequestManagement from "./screens/Student/RequestManagement/RequestManagement";
import SelfPacedLearning from "./screens/Student/SelfPacedLearning/SelfPacedLearning";
import ProtectedRoute from "./components/ProtectedRoute";
import ContextProvider from "./store/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Login></Login>,
            },
            {
                path: "signup",
                element: <Signup></Signup>,
            },
            {
                path: "Student",
                element: (
                    <ProtectedRoute
                        allowedUserType={"Student"}
                    >
                    </ProtectedRoute> 
                    
                ),
                children: [
                    {
                        path: "",
                        element: <Student></Student>,
                        children: [
                            {
                                path: "BridgingAlumniAndStudents",
                                element: <BridgingAlumniAndStudents />,
                            },
                            {
                                path: "ProfileAndPersonalization",
                                element: <ProfileAndPersonalization />,
                            },
                            {
                                path: "ProgressTrackingAndAnalytics",
                                element: <ProgressTrackingAndAnalytics />,
                            },
                            {
                                path: "RequestManagement",
                                element: <RequestManagement />,
                            },
                            {
                                path: "SelfPacedLearning",
                                element: <SelfPacedLearning />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "Teacher",
                element: (
                    <ProtectedRoute
                        allowedUserType={"Teacher"}
                    ></ProtectedRoute>
                ),
                children: [
                  {
                        path: "",
                        element: <Teacher></Teacher>,
                        children: [

                        ]
                  }
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </ContextProvider>
);
