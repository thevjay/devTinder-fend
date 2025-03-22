import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import FooterBar from './FooterBar'
import axios from 'axios'
import {BASE_URL} from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async() =>{
    if(userData) return;
    try{
      const user = await axios.get(BASE_URL+'/profile/view',
        {withCredentials:true}
      );

      dispatch(addUser(user.data))
    }
    catch(error){
      if(error.status === 401){
        navigate('/login'); 
      }
      //console.error(error);
    }
  }

  useEffect(()=>{
      fetchUser();
  },[])

  return (
    <div>
      <NavBar/>
      <Outlet/>
      <FooterBar/>
    </div>
  )
}

export default Body
