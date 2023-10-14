import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full w-full">
      <div className="text-4xl md:text-6xl text-center flex flex-col justify-around items-center h-full w-full font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        <h1>Welcome To FaceAuth</h1>
        <div className="flex items-center justify-center text-lg md:text-2xl md:gap-6 my-4 md:my-12">
          <a className="mr-4 text-blue-500 hover:text-blue-700 bg-black px-6 py-2 hover:scale-105 rounded-full" 
            href="/auth/login">
            Login
          </a>
          <a className="text-pink-500 hover:text-pink-700 bg-black px-6 py-2 hover:scale-105 rounded-full" 
            href="/auth/register">
            Register
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2">
        <img src="/pic.svg" alt="FaceAuth" className="w-full md:max-w-2xl" />
      </div>
    </div>
  );
}

export default HomePage;
