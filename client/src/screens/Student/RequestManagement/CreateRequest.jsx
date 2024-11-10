import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";

function CreateRequest() {
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredUser, setFilteredUser] = useState([{}]);
    const [selectedUser, setSelectedUser] = useState("");
    const [sendRequest, setSendRequest] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/fetch-alumni-data", {
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
                console.log(data);
                console.log(fetchedData);
                setFetchedData(data.data);
                console.log(fetchedData);
            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
            });
    }, []);

    function handleSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const user = fetchedData.filter(
            (user) => user.userName === data.username
        );
        setFilteredUser(user);
    }

    const openModal = (userData) => {
        setSelectedUser(userData);
        console.log(selectedUser);
        console.log(filteredUser);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    function handleRequest(params) {
        setSendRequest(!sendRequest);
    }

    async function handleSendingRequest(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());



        const requestDetails = {
            alumniID: filteredUser[0].alumniID,
            message: data.message,
        };

        const response = await fetch("http://localhost:3000/send-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(requestDetails),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        }

        if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            throw new Error(data.message);
        }
    }

    return (
        <>
            <div className="flex content-center justify-center  m-10 p-10 h-full pt-0">
                <div className="flex content-center justify-center  flex-col w-full">
                    <form
                        action=""
                        className="flex justify-center items-center m-5 "
                        onSubmit={(event) => handleSearch(event)}
                    >
                        <input
                            type="text"
                            placeholder="Enter the User Name"
                            name="username"
                            size={50}
                            className="text-center p-1 shadow-md rounded-md"
                        />
                        <button
                            type="submit"
                            className="ml-2 text-xl shadow-md h-full p-1 rounded-md"
                        >
                            <CiSearch />
                        </button>
                    </form>
                    <div>
                        <div>
                            <div
                                className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 bg-white shadow-md mb-1"
                                onClick={() => openModal(filteredUser)}
                            >
                                <div className="mr-10 text-5xl ml-4">
                                    <CiUser />
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        <strong>Name:</strong>{" "}
                                        {filteredUser[0].userName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Qualification:</strong>{" "}
                                        {filteredUser[0].qualification}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Experience:</strong>{" "}
                                        {filteredUser[0].experience}
                                    </p>
                                </div>

                                <div className={`font-semibold `}>
                                    <button
                                        onClick={(e) => {
                                            handleRequest();
                                            e.stopPropagation();
                                        }}
                                    >
                                        Send Request
                                    </button>
                                    {}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedUser && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
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
                        <h2 className="text-xl font-bold mb-4">User Details</h2>
                        <p>
                            <strong>Name:</strong> {filteredUser[0].userName}
                        </p>
                        <p>
                            <strong>Achievements:</strong>{" "}
                            {filteredUser[0].achievements}
                        </p>
                        <p>
                            <strong>Qualification:</strong>{" "}
                            {filteredUser[0].qualification}
                        </p>
                        <p>
                            <strong>Email:</strong> {filteredUser[0].email}
                        </p>
                        <p>
                            <strong>Availability Details:</strong>{" "}
                            {filteredUser[0].availabilityDetails}
                        </p>
                        <p>
                            <strong>Experience:</strong>{" "}
                            {filteredUser[0].experience}
                        </p>
                    </div>
                </div>
            )}

            {sendRequest && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleRequest}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                            onClick={handleRequest}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Enter The Message
                        </h2>
                        <form action="" onSubmit={handleSendingRequest}>
                            <textarea
                                name="message"
                                id="message"
                                className="w-full"
                            ></textarea>
                            <button type="submit">Send Request</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateRequest;
