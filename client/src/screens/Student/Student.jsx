import { Outlet } from "react-router-dom";
import StudentDashboard from "../../components/StudentDashboard";

const Student = () => {
    return (
        <>
            <div className="flex justify-center items-center  m-0 p-0 h-full">
                <StudentDashboard></StudentDashboard>
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Student;
