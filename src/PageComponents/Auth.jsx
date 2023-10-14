import React from 'react'

const Auth = ({children}) => {
  return (
    <div className=' min-h-screen w-screen bg-slate-100 flex flex-col items-center justify-center overflow-auto'>
        {children}
    </div>
  )
}

export default Auth