import React from 'react'
import Auth from '@/PageComponents/Auth'
import RegisterCard from '@/components/auth/RegisterCard'

const page = () => {
  return (
    <div>
        <Auth>
          <RegisterCard />
        </Auth>
    </div>
  )
}

export default page