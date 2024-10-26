import { Outlet } from "react-router-dom";
// import StudentDashboard from "../../../components/Dashboard";

const Student = () => {
    return (
        <>
            <div className="flex justify-center items-center  m-0 p-0">

                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Student;