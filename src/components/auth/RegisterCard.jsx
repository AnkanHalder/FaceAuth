"use client"
import React, { useEffect, useState } from 'react';
import TakeImageComp from './TakeImageComp';
import { useSearchParams } from 'next/navigation'

const RegisterCard = ({params,...props}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    role: "",
    gender: 'M',
  });
  const [takePics, setTakePics] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const errorMsg = useSearchParams().get('errorMsg');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };


  useEffect(()=>{
    if(errorMsg){
      setErrorData(errorMsg);
    }
  },[errorMsg]);
  return (
    <>
      {!takePics ? (
        <div className='card-width shadow-large p-8 rounded-xl'>
          <div className='flex-col-center mt-4'>
            <h1 className='text-2xl font-semibold mb-2'>
              Register for FaceAuth
            </h1>
            <p className='text-gray-600'>Assured Security</p>
            <form className='my-6'>
              <div className='mb-4'>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  id='name'
                  name='name'
                  value={data.name}
                  required
                  onChange={handleChange}
                  placeholder='Your Name'
                />
              </div>

              <div className='mb-4'>
                <h1 className='text-red-500'>{errorData}</h1>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='email'
                  id='email'
                  name='email'
                  value={data.email}
                  required
                  onChange={handleChange}
                  placeholder='Your Email'
                />
              </div>

              <div className='mb-4'>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='password'
                  id='password'
                  name='password'
                  value={data.password}
                  required
                  onChange={handleChange}
                  placeholder='Your Password'
                />
              </div>

              <div className='mb-4'>

                <textarea
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='bio'
                  name='bio'
                  value={data.bio}
                  required
                  onChange={handleChange}
                  placeholder='Tell us about yourself'
                />
              </div>

              <div className='mb-4'>

                <select
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='gender'
                  name='gender'
                  value={data.gender}
                  required
                  onChange={handleChange}
                >
                  <option value='M'>Male</option>
                  <option value='F'>Female</option>
                </select>
              </div>
              <div className='mb-4'>
                <select
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='role'
                  name='role'
                  value={data.role}
                  required
                  onChange={handleChange}
                >
                  <option value='Student'>Student</option>
                  <option value='Intern'>Intern</option>
                  <option value='Junior Developer'>Junior Developer</option>
                  <option value='Senior Developer'>Senior Developer</option>
                  <option value='Admin'>Admin</option>
                  <option value='Client'>Client</option>
                </select>
              </div>

              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  setTakePics(true); // This should be set to true to proceed to image capture
                }}
              >
                Save And Continue
              </button>
            </form>
          </div>
        </div>
      ) : (
        <TakeImageComp data={data} setter={setTakePics} />
      )}
    </>
  );
};

export default RegisterCard;
