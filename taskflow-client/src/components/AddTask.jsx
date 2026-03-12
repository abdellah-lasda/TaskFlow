import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { createTask } from '../features/api'
import { useCookies } from "react-cookie"


export default function AddTask() {
  const navigate = useNavigate()
  const [tache,setTache] =useState({})
  const [errors,setErrors] = useState({"Status":"","Priority":"","Title":"","Description":"","Due_date":""}) 
  
  const [cookies,setCookies,removeCookies] =useCookies(['access_token'])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const result = await createTask(cookies.access_token,tache)
    if(!result.success){
      setErrors(result.errors)
    }
    else{
      navigate('/tasks')
      toast.success("tache ajouter avec success");
    }
  }

  const handleChange = (e)=>{
    setTache({...tache,[e.target.name]:e.target.value})
  }


  return (
    <div className='rounded-2xl bg-white border border-gray-400 p-6 flex flex-col gap-6 ' >
      <section>
        <h1 className='font-bold capitalize text-xl' >create new task</h1>
        <p className=' text-black/85 ' >Fill in the details below to create a new task</p>
      </section>
      <form action="" onSubmit={handleSubmit} className='gap-5 flex flex-col' >
        <div>
            <label className='block font-medium capitalize pb-2' htmlFor="">title *</label>
            <input type="text" name='Title' onChange={handleChange} placeholder='e.g, Design lansing page' className={`${ errors?.Title ?"border-red-500 " :""} focus:outline-none focus:ring-2 focus:ring-blue-500 ps-3  placeholder:text-lg placeholder:text-black/85 p-2 rounded-2xl border border-gray-400 w-full`} />
            { errors?.Title ? <span className='mx-2 text-sm text-red-500 ' >{errors?.Title}</span> : ""}
        </div>
        <div>
            <label className='block font-medium capitalize pb-2' htmlFor="">description *</label>
            <textarea name="Description" onChange={handleChange}  placeholder='Describe the task in detail...' className={`${ errors?.Description ?"border-red-500 " :""} focus:outline-none focus:ring-2 focus:ring-blue-500 ps-3 placeholder:text-lg placeholder:text-black/85 p-2 rounded-2xl border border-gray-400 w-full`}  id=""></textarea>
            { errors?.Description ? <span className='mx-2 text-sm text-red-500 ' >{errors?.Description}</span> : ""}
        </div>
        <div className='grid gap-y-5 grid-cols-4' >
            <div className='sm:col-span-2 col-span-4  ' >
              <label className='block font-medium capitalize pb-2' htmlFor="">status</label>
              <select name='Status'onChange={handleChange}  className={`${ errors?.Status ?"border-red-500 " :""}focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl border border-gray-300 capitalize px-4 py-1.5`} id="">
                <option value="">all status</option>
                <option value="Pending">pending</option>
                <option value="Completed">completed</option>
                { errors?.Status ? <span className='mx-2 text-sm text-red-500 ' >{errors?.Status}</span> : ""}
              </select>
            </div>
            <div className='sm:col-span-2 col-span-4 ' >
              <label className='block font-medium capitalize pb-2' htmlFor="">priority</label>
              <select name='Priority'onChange={handleChange}  className={`${ errors?.Priority ?"border-red-500 " :""}focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl border border-gray-300 capitalize px-4 py-1.5`} id="">
                <option value="">all priority</option>
                <option value="Low">low</option>
                <option value="Medium">meduim</option>
                <option value="High">high</option>
                { errors?.Priority ? <span className='mx-2 text-sm text-red-500 ' >{errors?.Priority}</span> : ""}
              </select>
            </div>
        </div>
        <div>
            <label className='block font-medium capitalize pb-2' htmlFor="">Due Date</label>
            <input name='Due_date'onChange={handleChange}  type="date" className={`${ errors?.Due_date ?"border-red-500 " :""} focus:outline-none focus:ring-2 focus:ring-blue-500 ps-3  p-2 rounded-2xl border border-gray-400 w-full`} />
            { errors?.Due_date ? <span className='mx-2 text-sm text-red-500 ' >{errors?.Due_date}</span> : ""}
        </div>
        <div className='flex justify-end gap-3' >
          <Link to={"/tasks"} className=" hover:cursor-pointer py-3 px-4 font-medium bg-blue-50 rounded-2xl hover:bg-blue-200 duration-300 ease-linear transition-all ">Cancel</Link>   
          <button type='submit' className=" hover:cursor-pointer p-3 font-medium bg-blue-700 text-white rounded-2xl hover:bg-blue-700/80 duration-300 ease-linear transition-all ">Create Task</button>         
        </div>
      </form>
    </div>
  )
}
