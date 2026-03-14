import React, { useEffect, useState } from 'react'
import RecentTask from './RecentTask';
import { useCookies } from "react-cookie"
import { fetchRecentTasks } from '../features/api';
import {Link} from 'react-router-dom'
import { ArrowRight , Archive } from 'lucide-react';



export default function RecentTasks() {
  const [cookies,setCookies,removeCookies] = useCookies(['access_token'])
  const [tasks,setTasks] = useState(null) ; 

  const storedata = async (token)=>{
    setTasks(await fetchRecentTasks(token))
  }
  
  useEffect(()=>{
    if(!cookies.access_token){
      navigate("/")
    }
    else if(cookies.access_token){
      storedata(cookies.access_token)
    }
  },[cookies])


  return (
    <div className='w-full pb-10 h-full border-gray-300' >
        {
          tasks ? 
          
            tasks.length > 0 ?
            <>
            <div className=' bg-white font-medium rounded-t-2xl px-7 py-4 border border-b-0 border-gray-300  flex justify-between items-center' >
              <h1>Recents tasks</h1>
              <Link to={'/tasks'} className=' hover:text-blue-800/70 duration-150 ease-linear transition-all flex justify-center items-center gap-2 text-[14.5px] text-blue-800 font-medium ' ><span>View all</span><ArrowRight className='inline-block size-4'/></Link>
            </div> 
            {tasks.map((e,k)=>{ return (
                <RecentTask 
                    date={e.Due_Date} 
                    preiority={e.Priority} 
                    title={e.Title} 
                    type={e.Status} 
                    key={k} 
                    isTheLastOne={k==tasks.length-1?true:false}
                />)
            })}
            </> 
            :
            <div className=" flex flex-col justify-center items-center gap-2 col-span-12 bg-gray-100 min-h-40 rounded-2xl w-full h-full">
                <div><Archive/></div>
                <span>No tasks yet.</span> 
                <Link to={'/tasks/add'} className='text-blue-600 hover:text-blue-600/80' >Create your first task to get started</Link>
            </div>
          :
          <div className="flex gap-2 col-span-12 bg-white rounded-2xl w-full  justify-center items-center h-40">
                <div className='size-4 border-2 border-blue-600 border-dotted border-bs-0 animate-spin rounded-full' ></div>
                <p className='' >Loading recent tasches...</p>
          </div>
        
        }
    </div>
  )
}
