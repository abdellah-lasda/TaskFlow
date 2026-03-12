import React, { useState } from 'react'
import AddTask from '../components/AddTask'
import { ArrowLeft } from 'lucide-react'
import {Link} from "react-router-dom"
import { filterUserTasks } from '../features/api';
import { useCookies } from 'react-cookie'



export default function CreateTask() {
  const [cookies,setCookies,removeCookies] = useCookies(['access_token'])
  const [info,setInfo] = useState(null);
  const handleChange = (e)=>{
    const {name,value} = e.target ;
    setInfo({...info,[name]:value})
  }

  const handleSubmit = async ()=>{
    await filterUserTasks(cookies.access_token,info)
  }

  return (
    <div className='sm:w-[70%] mx-auto'>
      <section className='mb-5 flex'>
        <Link to={'/tasks'} className=' text-gray-400 hover:text-black duration-150 ease-linear transition-all flex items-center gap-3 text-[14.5px] font-medium ' >
          <ArrowLeft className='inline-block size-4'/>
          <span>Back to Tasks</span>
        </Link>
      </section>
      <AddTask/>
    </div>
  )
}
