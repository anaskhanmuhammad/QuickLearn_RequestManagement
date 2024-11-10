import { CiUser } from "react-icons/ci";


const ViewRequest = ({requestData, openModal}) => {
    return <>
        <div className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 bg-white shadow-md mb-1" onClick={() => openModal(requestData)}>
            <div className="mr-10 text-5xl ml-4">
                <CiUser />
            </div>

            <div className="flex-1">
                <p className="font-semibold text-gray-800">
                    <strong>Sender:</strong> {requestData.alumniName}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Sent:</strong> {new Date(requestData.lastUpdate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Last Updated:</strong> {new Date(requestData.lastUpdate).toLocaleString()}
                </p>
            </div>


            <div className={`font-semibold `}>{ requestData.status}</div>
        </div>
    </>;
};

export default ViewRequest;
