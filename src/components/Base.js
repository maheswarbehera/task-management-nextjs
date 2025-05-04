"use client"
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'  


const Base = () => {

const { user } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); 
    }
  }, [user]);
  return (
    <> 
    
    </>
  )
}


export default Base