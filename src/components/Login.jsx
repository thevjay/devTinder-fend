import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {

    const [ emailId, setEmailId ] = useState("rahul@example.com");
    const [ password, setPassword ] = useState("Secure@Pass123"); 
    const [ Error, setError ] = useState("")
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
            //console.log(err.response.data.error)
            setError(err?.response?.data?.error)
            //console.error(err);
        }

    }
    
  return (
    <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title flex justify-center">Login</h2>
                <div>
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                        </div>
                        <input 
                            type="text" 
                            value={emailId}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=> setEmailId(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                            type="text" 
                            value={password}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </label>
                </div>
                { Error && (<p className='text-red-800 py-2'>ERROR: {Error}</p>)}
                <div className="card-actions justify-end p-2">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
