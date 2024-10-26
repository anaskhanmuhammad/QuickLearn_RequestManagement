import React, { useContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { context } from "../../store/store";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {userType, setUserType} = useContext(context);

  const handleLogin = async (event) => {
    event.preventDefault();
    const userDetails = {
      email: email,
      password: password,
    }


    
    
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data.message);
          alert(data.message);
          console.log(data.userType)
          setUserType(data.userType);
          console.log(`/${data.userType}`)
          navigate(`/${data.userType}`);
        }

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.message);
          alert(errorData.message)
          throw new Error(errorData.message);
        }
      }
      catch (error) {
        console.log(error);
      }

      
    

  } 


  function handleDontHaveAccount() {
    navigate('/signup')
  }

  return <>
  <div className="flex justify-center items-center flex-col h-screen w-screen">
    <div className="flex justify-center items-center flex-col bg-customGrey w-3/6 h-auto text-white">
      <div className="text-4xl m-10"><h1>Quick Learn</h1></div>
      <div className="text-xl"><h3>Login to Your Account</h3></div>
      <form onSubmit={handleLogin} className="flex justify-center items-center flex-col space-y-5 m-5 text-black">
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
          onChange={(event) => setPassword(event.target.value)} 
          placeholder="Enter Your Password" 
          size={50} 
          className="text-center focus:outline-none"
        />
        
        <button onClick={handleDontHaveAccount} className="text-white">Don't have an account?</button>
        <input type="submit" className="text-center hover:bg-customDark px-10 py-1 cursor-pointer text-white"/>
      </form>
    </div>
  </div>
</>;
}

export default Login;
