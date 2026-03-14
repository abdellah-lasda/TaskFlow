import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie"
import { fetchUserInfo } from '../features/api';
import Statistiques from '../components/Statistiques';
import RecentTasks from '../components/RecentTasks';
import { toast } from 'react-toastify';



export default function Dashboard() {

  const [user,setUser] = useState({}) 
  const [cookies,setCookies,removeCookies] = useCookies(['access_token'])

   const fetchUser = async (token)=>{
    const result = await fetchUserInfo(token)
    setUser(result)
  }
  
  useEffect(()=>{
    if(!cookies.access_token){
      navigate("/")
      toast.error("You are not authorized to access this page.");
    }
    else if (cookies.access_token){
        fetchUser(cookies.access_token)
    }
  },[cookies])



  return (  
    <div className='h-full w-full flex flex-col gap-7 ' >
      <section id="welcome" className='ps-1' >
        <h1 className=' text-[25px]  font-bold pb-1.5' >Welcome back, {user?.Name}</h1>
        <p className='font-semibold text-[15px] truncate  text-black/50' >Here's an overview of your tasks and productivity</p>
      </section>
      <Statistiques />
      <RecentTasks />
    </div>
  )
}
