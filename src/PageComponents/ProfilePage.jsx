"use client"
import React, { useContext, useEffect,useState } from 'react';
import { LoginContext } from '@/contexts/LoginContext';
import { useRouter } from 'next/navigation'; // Change "navigation" to "router"
import Loading from './Loading';

const ProfilePage = () => {
  const router = useRouter();
  const { user,setUser } = useContext(LoginContext);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else{
        setLoading(false);
        console.log(user);
    }
  }, [user]);

  const handleLogout = () => {
    router.push('/');
    setUser(null);
  };

  if(loading){
    return <Loading/>
  }
  if(!user){
    return <Loading/>
  }
  return (
    <>
    <div className="nav fixed top-0 left-0 w-full flex justify-between bg-black p-2">
      <a href="/" className='text-2xl p-4 bg-black text-purple-500 cursor-pointer rounded-full'>
                  Home
      </a>
      <div className='w-full text-right'>
                <button onClick={()=>{handleLogout()}} className='text-2xl p-4 bg-black text-purple-500 cursor-pointer rounded-full'>
                  Logout
                </button>
      </div>
    </div>
    <div className='md:p-8  flex items-center justify-left'>
        <div className='p-2 sm:p-16 shadow-large flex-col-center gap-4'>
            <h1 className='my-4 text-3xl font-extrabold font-sans'>Welcome {user.name}</h1>
            <div className='flex-col-center gap-4'>
                <div className='h-full w-full'>
                    <h2 className='my-2 text-2xl font-bold text-left'>
                        Profile Details
                    </h2>
                </div>
                <div className='flex gap-4 h-full w-full'>
                    <h3>Email:</h3>
                    <h3>{user.email}</h3>
                </div>
                <div className='flex gap-4 h-full w-full'>
                    <h3>Gender:</h3>
                    <h3>{user.gender}</h3>
                </div>
                <div className='flex gap-4 h-full w-full'>
                    <h3>Role:</h3>
                    <h3>{user.role}</h3>
                </div>
                <div className='flex gap-4 h-full w-full text-left'>
                    <h3>Bio:</h3>
                    <h3 >{user.bio}</h3>
                </div>
            </div>
            
        </div>
    </div>

    </>
    
  )
};

export default ProfilePage;
