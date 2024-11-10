import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userDetails = {
            email: email,
            password: password,
            name: name,
            age: age,
            contactNumber: contactNumber,
            userType: userType,
        };

        if (password !== confirmPassword) {
            alert("Password does not Match");
        } else {
            try {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userDetails),
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log(data.message);
                    alert(data.message);
                    navigate("/");
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    // console.log(errorData.message);
                    alert(errorData.message);
                    throw new Error(errorData.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="flex justify-center items-center flex-col h-screen w-screen">
                <div className="flex justify-center items-center flex-col bg-customGrey w-3/6 h-auto text-white">
                    <div className="text-4xl m-10">
                        <h1>Quick Learn</h1>
                    </div>
                    <div className="text-xl">
                        <h3>Create An Account</h3>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex justify-center items-center flex-col space-y-5 m-5 text-black"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter Your Email"
                            size={50}
                            className="text-center focus:outline-none"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter Your Password"
                            size={50}
                            className="text-center focus:outline-none"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Confirm Password"
                            size={50}
                            className="text-center focus:outline-none"
                        />

                        <fieldset className="text-center text-white">
                            <legend>Are you a Student or a Teacher?</legend>
                            <label htmlFor="student">Student</label>
                            <input
                                type="radio"
                                value={"Student"}
                                id="student"
                                name="userType"
                                onChange={(event) => {
                                    setUserType(event.target.value);
                                }}
                                className="m-2"
                            />
                            <label htmlFor="teacher">Teacher</label>
                            <input
                                type="radio"
                                value={"Teacher"}
                                id="teacher"
                                name="userType"
                                onChange={(event) => {
                                    setUserType(event.target.value);
                                }}
                                className="m-2"
                            />
                        </fieldset>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter Your Name"
                            size={50}
                            className="text-center focus:outline-none"
                        />
                        <input
                            type="text"
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                            placeholder="Enter Your Age"
                            size={50}
                            className="text-center focus:outline-none"
                        />
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(event) =>
                                setContactNumber(event.target.value)
                            }
                            placeholder="Enter Your Contact Number"
                            size={50}
                            className="text-center focus:outline-none"
                        />

                        <input
                            type="submit"
                            className="text-center hover:bg-customDark px-10 py-1 cursor-pointer text-white"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
