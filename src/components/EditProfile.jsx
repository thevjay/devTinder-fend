import React, { useState } from 'react' ;
import UserCard from '../components/UserCard' ;
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age|| "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || null)
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);

  const saveProfile = async()=>{
    setError("")
    try{
        const res = await axios.put(BASE_URL+'/profile/edit',{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
        },{withCredentials:true});

        console.log("Profile updated:", res.data);

        dispatch(addUser(res?.data?.data))
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false);
        },3000);
    }
    catch(error){
        setError(error.response.data.error)
    }
  }



  return (
    <>
    <div className='flex justify-center items-center gap-5'>
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">First Name</span>
              <input 
                type="text" value={firstName} 
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">Last Name</span>
              <input 
                type="text" value={lastName} 
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">Photo URL</span>
              <input 
                type="text" value={photoUrl} 
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setPhotoUrl(e.target.value)} 
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">Age</span>
              <input 
                type="text" value={age} 
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setAge(e.target.value)} 
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">Gender</span>
              <input 
                type="text" value={gender} 
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setGender(e.target.value)} 
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">About</span>
              <input 
                type="text" value={about} 
                className="input input-bordered w-full max-w-xs" 
                onChange={(e) => setAbout(e.target.value)} 
              />
            </label>
          </div>

          {error && (<p className="text-red-800 py-2">ERROR: {error}</p>)}

          <div className="card-actions justify-center p-2">
            <button className="btn btn-primary" onClick={saveProfile}>Save</button>
          </div>
        </div>
      </div>
    </div>
    <div>
        <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
    </div>
    </div>
    {showToast &&(<div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile saved successfully.</span>
        </div>
    </div>)}
    </>
  );
};

export default EditProfile;
