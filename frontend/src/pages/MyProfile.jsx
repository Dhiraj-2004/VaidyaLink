import React, { useState } from 'react'
import { assets } from '../assets/assets';

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name:"Edward Vincent",
    image:assets.profile_pic,
    email:'richardjames@gmail.com',
    phone:'+12 347 8932',
    address: {
      line1:"57th Cross, Richond",
      line2:"Circle, church, london"
    },
    gender:'Male',
    dob:'2000-01-20'
  })

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div>

      <img src={userData.image} alt="" />
      {
        isEdit
        ? <input type='text' value={userData.name} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} /> 
        : <p>{userData.name}</p>
      }

    </div>
  )
}

export default MyProfile
