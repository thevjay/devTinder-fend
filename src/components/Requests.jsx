import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store)=>store.request);



    const reviewRequest = async(status,_id) =>{
        try{
            const res = await axios.post(BASE_URL+'/request/review/'+status+"/"+_id,
                {},
                {withCredentials:true}
            );

            dispatch(removeRequests(_id))
        }
        catch(error){
            console.error(error)
        }
    }

    const fetchRequests = async()=>{
        try{
            const res = await axios.get(BASE_URL+'/user/requests/received',{
                withCredentials:true,
            });

            console.log(res.data.data)
            dispatch(addRequests(res?.data?.data))
        }
        catch(err){
            console.error(err)
        }
    } 

    useEffect(()=>{
        fetchRequests()
    },[])

    if(!requests) return <h1>.....Loaging</h1>

    if(requests.length === 0) return <h1> No Request Found</h1>

  return (
        <div className='mt-24'>
            <div className="flex justify-center items-center">
                <h1 className='text-2xl btn rounded-md'>Requests</h1>
            </div>

            <div className="flex flex-col items-center">
            { requests && requests.map((request)=>{
                const { _id , firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;

                return(
                    <div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto' >
                <div>
                    <img 
                        alt='photo'
                        src={photoUrl}
                        className='w-20 h-20 rounded-full'
                    />
                </div>
                <div className='text-left mx-4 '>
                    <h2 className='font-bold text-xl'>{firstName+ " "+ lastName}</h2>
                    {age && gender && (<p>{age+" "+gender}</p>)}
                    <p>{about}</p>
                </div>
                <div className='flex'>
                    <button className='btn btn-primary mx-2' onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                    <button className='btn btn-secondary mx-2' onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                </div>
                 
            </div>
                )
            })}
            </div>
        </div>
    )
}

export default Requests
