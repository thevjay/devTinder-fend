import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ emailId, setEmailId ] = useState("rahul@example.com");
    const [ password, setPassword ] = useState("Secure@Pass123"); 
    const [ Error, setError ] = useState("")

    const [ isLoginForm, setIsLoginForm ] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async() => {
        try{
            const res = await axios.post(BASE_URL + '/login',{
                emailId,
                password
            },{ withCredentials:true })

            // Axios automatically parses JSON, so directly access res.data
            dispatch(addUser(res.data))
            navigate('/')
        }
        catch(err){
            setError(err?.response?.data?.error || "Invalid credentails")
        }

    }

    const handleSignup = async() =>{
        try{
            const res = await axios.post(BASE_URL+'/signup',{
                firstName,
                lastName,
                emailId,
                password
            },{
                withCredentials:true,
            })

            dispatch(addUser(res.data))
            navigate('/profile')
        }
        catch(error){
            setError(error?.response?.data?.error || "Invalid credentials")
        }
        
    }
    
  return (
    <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                <div>
                {!isLoginForm && (<><label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">FirstName</span>
                        </div>
                        <input 
                            type="text" 
                            value={firstName}
                            placeholder="firstName"
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=> setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">LastName</span>
                        </div>
                        <input 
                            type="text" 
                            value={lastName}
                            placeholder="lastName"
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=> setLastName(e.target.value)}
                        />
                    </label></>)}
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                        </div>
                        <input 
                            type="text" 
                            value={emailId}
                            placeholder="emailId"
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=> setEmailId(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            placeholder="Enter your password"
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </label>
                </div>
                { Error && (<p data-testid="error-message" className='text-red-800 py-2'>ERROR: {Error}</p>)}
                <div className="card-actions justify-end p-2">
                    <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>
                        { isLoginForm ? "Login" : "SignUp" }
                    </button>
                </div>
                <p className='cursor-pointer justify-start' onClick={()=>setIsLoginForm((value)=>!value)}>
                    {   isLoginForm 
                        ? "New User? Signup Here"
                        : "Existing User? Login Here"
                    }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
