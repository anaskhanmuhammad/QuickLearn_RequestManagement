import { Outlet } from "react-router-dom";
import AlumniDashboard from "../../components/AlumniDashboard";

const Alumni = () => {
    return (
        <>
            <div className="flex justify-center items-center  w-full m-0 p-0">
                <AlumniDashboard></AlumniDashboard>
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Alumni;
