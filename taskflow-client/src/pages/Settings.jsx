import React from 'react'
import { Sun , User ,Mail ,Shield } from 'lucide-react';
import Toggle from "../components/Toggle"
import { useCookies } from "react-cookie"
import { toast } from 'react-toastify';
import { useState , useEffect } from 'react'
import { fetchUserInfo } from '../features/api';


export default function Settings() {
  const [user,setUser] = useState(null)
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
    <div className='w-full mb-20 px-3 sm:px-[10%] h-full gap-5 flex flex-col' >
      
      <section>
        <h1 className='font-bold text-3xl' >Settings</h1>
        <p className='font-medium text-gray-400 mt-1' >Manage your preferences and account information.</p>
      </section>

      <section className='bg-white border shadow-md border-gray-300 rounded-2xl py-6 px-8 flex flex-col gap-3' >
        <div>
          <h2 className='text-lg font-medium' >Appearance</h2>
          <p className='text-sm font-medium text-gray-500 mt-1' >Customize how TaskFlow looks on your device.</p>
        </div>
        <hr className='text-gray-200 my-2 ' />
        <div className='flex justify-between' >
          <div className='flex gap-3' >
            <div id="icon" className='' >
                <span className='p-3 grid hover:bg-blue-200/30 place-content-center bg-gray-200/80 rounded-2xl duration-300 ease-linear transition-all' ><Sun className='size-5' /></span>
            </div>
            <div>
              <h2 className='text-[16px] font-medium' >dark Mode</h2>
              <p className='text-sm  text-gray-400 ' >Switch between light and dark themes</p>
            </div>
          </div>
          <button id="radio"><Toggle /></button>
        </div>
      </section>
      
      <section className='bg-white border shadow-md border-gray-300 rounded-2xl py-6 px-8 flex flex-col gap-3' >
        <div>
          <h2 className='text-lg font-medium' >Account</h2>
          <p className='text-sm font-medium text-gray-500 mt-1' >Your personal account information.</p>
        </div>
        <hr className='text-gray-200 my-2 ' />

        {
          user && <div id="infoContainer">
            <section id="user" className=' flex gap-3 py-3.5 items-center' >
                  <span className='p-2 inline-block  bg-blue-200/30 font-semibold rounded-full '>
                      <span className="size-8 text-blue-700 grid place-content-center text-lg -mt-0.5">{user.Name[0]}</span>
                  </span>
                  <div className='' >
                      <p className='font-medium truncate  text-[15px] ' >{user.Name}</p>
                      <p className='text-sm truncate  text-gray-500' >User</p>
                  </div>
            </section>

            <section id="full_name" className=' flex gap-3 py-3.5 items-center' >
                  <span className='p-3 inline-block  bg-blue-200/30 font-semibold rounded-2xl '>
                      <User className='text-gray-400 size-5' />
                  </span>
                  <div className='' >
                      <p className='text-sm truncate text-gray-500' >Full Name</p>
                      <p className='font-medium truncate text-[15px] ' >{user.Name}</p>
                  </div>
            </section>

            <section id="Email" className=' flex gap-3 py-3.5 items-center' >
                  <span className='p-3 inline-block  bg-blue-200/30 font-semibold rounded-2xl '>
                      <Mail className='text-gray-400 size-5' />
                  </span>
                  <div className='' >
                      <p className='text-sm  truncate  text-gray-500' >Email Address</p>
                      <p className='font-medium   text-[15px] ' >{user.Email}</p>
                  </div>
            </section>

            <section id="Role" className=' flex gap-3 py-3.5 items-center' >
                  <span className='p-3 inline-block  bg-blue-200/30 font-semibold rounded-2xl '>
                      <Shield className='text-gray-400 size-5' />
                  </span>
                  <div className='' >
                      <p className='text-sm truncate  text-gray-500' >Role</p>
                      <p className='font-medium text-[15px] ' >User</p>
                  </div>
            </section>
          </div>
        }
      </section>
    </div>
  )
}
