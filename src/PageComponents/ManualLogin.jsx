"use client"
import React, { useContext, useEffect, useState } from 'react';
import { ApiCaller } from '@/components/ApiManager/ApiCaller';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/contexts/LoginContext';

const ManualLogin = ({ params, ...props }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const {setUser} = useContext(LoginContext);
  const router = useRouter();
  const [errorData, setErrorData] = useState(null);
  const errorMsg = useSearchParams().get('errorMsg');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (errorMsg) {
      setErrorData(errorMsg);
    }
  }, [errorMsg]);

  const handleLogin = async ()=>{
    const res = await ApiCaller.loginUser(data.email, data.password);
    if(res.success){
        setUser(res.data);
        router.push("/profile")
    } else{
        setErrorData(res.msg);
    }
  }
  return (
    <>
        <div className='card-width shadow-lg p-8 rounded-xl'>
          <div className='flex-col-center mt-4'>
            <h1 className='text-2xl font-semibold mb-2 text-center'>
              Login to FaceAuth
            </h1>
            <p className='text-gray-600 text-center'>Assured Security</p>
            <form className='my-6'>
              <div className='mb-4'>
                <input
                  className='input-field'
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
                  className='input-field'
                  type='password'
                  id='password'
                  name='password'
                  value={data.password}
                  required
                  onChange={handleChange}
                  placeholder='Your Password'
                />
              </div>

              <p className='text-red-500 mb-4'>{errorData}</p>

              <button
                className='btn-primary bg-blue-500 text-white py-2 px-4 rounded-xl'
                type='submit'
                onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
              >
                Login
              </button>
              <a
                className='btn-primary bg-blue-500 text-white py-2 px-4 rounded-xl m-4'
                type='submit'
                href="/auth/register"
              >
                Register
              </a>
            </form>
          </div>
        </div>
    </>
  );
};

export default ManualLogin;
