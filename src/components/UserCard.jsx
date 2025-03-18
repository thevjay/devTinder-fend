import React from 'react'

const UserCard = ({user}) => {
    const { firstName , lastName, photoUrl, age, gender, about } = user;
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
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
