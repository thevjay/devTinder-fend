import React, { useState } from 'react' ;
import UserCard from '../components/UserCard' ;
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age|| '');
  const [gender, setGender] = useState(user.gender || '');
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  //const [skills, setSkills] = useState([]); 
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState('');
  //const [newSkill, setNewSkill] = useState(''); // For inputting a new skill

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
        //setError(err.response.error.data)
        console.error(error)
    }
  }


//   // Function to add skill
//   const addSkill = () => {
//     if (newSkill.trim() !== '' && !skills.includes(newSkill)) {
//       setSkills([...skills, newSkill]); // Add new skill to array
//       setNewSkill(''); // Clear input field
//     }
//   };

//   // Function to remove skill
//   const removeSkill = (skillToRemove) => {
//     setSkills(skills.filter((skill) => skill !== skillToRemove));
//   };

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

            {/* Skills Section */}
            {/* <label className="form-control w-full max-w-xs my-4">
              <span className="label-text">Skills</span>
              <div className="flex gap-2">
                <input 
                  type="text" value={newSkill} 
                  className="input input-bordered w-full max-w-xs" 
                  onChange={(e) => setNewSkill(e.target.value)} 
                  placeholder="Add a skill"
                />
                <button className="btn btn-primary" onClick={addSkill}>Add</button>
              </div>
            </label> */}

            {/* Display Added Skills */}
            {/* <div className="mt-2">
              {skills.length > 0 && (
                <div>
                  <p className="font-semibold">Added Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="badge badge-info flex items-center gap-1">
                        {skill}
                        <button className="ml-2 text-red-500" onClick={() => removeSkill(skill)}>✖</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div> */}
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
