import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((store)=>store.connection)
    const fetchConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL+'/user/connections',{
                withCredentials:true
            });
            //console.log(res.data.data)
            dispatch(addConnections(res?.data?.data))
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections) return;

    if(connections.length === 0) return <h1> No Connection Found </h1>

  return (
    <div className='text-center my-10'>
      <h1 className='text-2xl font-bold'>Connections</h1>

      {connections.map((connection,index)=>{

        const { firstName, lastName, photoUrl, age, gender, about } = connection;
        
        return (
            <div key={index} className='flex m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto' >
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
                 
            </div>
        )
      })}
    </div>
  )
}

export default Connections
