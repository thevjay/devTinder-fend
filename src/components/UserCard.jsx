import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const { _id,firstName , lastName, photoUrl, age, gender, about } = user;
  
    const dispatch = useDispatch();

    const handleSendRequest = async(status,userId)=>{
      try{
        const res = await axios.post(BASE_URL+'/request/send/' + status + "/" + userId,
          {} ,
          {withCredentials:true}
        )

        dispatch(removeUserFromFeed(userId))
      }
      catch(error){
        console.error(error)
      }
    }

  return (
    <div className='my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes"
      className='w-[250px] p-4 object-cover' 
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    <p>{about}</p>
    {age && gender && (<p>{age+" "+gender}</p>)}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" aria-label="Ignore" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
