import React, { useEffect, useState } from "react";
import ViewRequest from "./components/ViewRequest";

const ViewRequests = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState('');

    useEffect( () => {
         fetch("http://localhost:3000/fetch-recieved-request-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); 
            })
            .then((data) => {
                console.log(data)
                console.log(fetchedData);
                setFetchedData(data.data); 
                console.log(fetchedData);

            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
            });
    }, []);

    const openModal = (requestData) => {
      setSelectedRequest(requestData);
  };

  const closeModal = () => {
      setSelectedRequest(null);
  };

  const handleStatusUpdate = (newStatus, requestID) => {
    fetch("http://localhost:3000/update-request-data", {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            id: requestID,       
            status: newStatus,   
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            alert(data.message)
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
  }

    return (
        <>
            <div className=" w-full h-full mt-10">
                <div></div>
                <div className="ml-5 mr-5" >
                  {fetchedData.map((request) => (
                    <ViewRequest key={request.requestID} requestData={request} openModal={openModal}></ViewRequest>
                  ))}
                    
                </div>
            </div>

            { selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div 
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Request Details</h2>
                        <p><strong>Sender:</strong> {selectedRequest.userName}</p>
                        <p><strong>Message:</strong> {selectedRequest.message}</p>
                        <p><strong>Request Details:</strong> {selectedRequest.requestDetails}</p>
                        <p><strong>Status:</strong> {selectedRequest.status}</p>
                        <p><strong>Last Updated:</strong> {new Date(selectedRequest.lastUpdate).toLocaleString()}</p>

                        {selectedRequest.status === 'Pending' && (<div className="mt-10 w-full flex justify-around items-center">
                            <button className="border-2 pl-6 pr-6 p-1 rounded hover:bg-slate-200" onClick={() => handleStatusUpdate('Accepted', selectedRequest.requestID)}>Accept</button>
                            <button className="border-2 pl-6 pr-6 p-1 rounded hover:bg-slate-200" onClick={() => handleStatusUpdate('Rejected', selectedRequest.requestID)}>Reject</button>
                        </div>)}

                    </div>

                </div>
            )}
        </>
    );
};

export default ViewRequests;
