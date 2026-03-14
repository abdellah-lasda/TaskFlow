import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { fetchUserTasks, filterUserTasks } from '../features/api';
import TaskList from '../components/TaskList';
import SearchBare from '../components/SearchBare';
import Loading from "../features/Loading"
import { toast } from 'react-toastify';
import { Archive } from 'lucide-react';


export default function Tasks() {

  const navigate = useNavigate();
  const [tasks,setTasks] = useState(null) ;
  const [filter,setFilter] = useState(null) ;
  const [refresh,setRefresh] = useState(true)
  const [cookies,setCookies,removeCookies] = useCookies(['access_token'])

  const fetchTaskList = async (token)=>{
    if(!filter){
      setTasks(await fetchUserTasks(token))
    }
    else{
      setTasks(await (token))
    }
  }

  const filterTaskList = async ()=>{
    const tasks = await filterUserTasks(cookies.access_token,filter)
    setTasks(tasks);
  }

  const handleChange = async ()=>{
    await filterTaskList()
  }


  
  useEffect(()=>{
    if(!cookies.access_token){
      navigate("/")
        toast.error("You are not authorized to access this page.");
    }
    else if(filter){
      filterTaskList(cookies.access_token)
    }
    else if(cookies.access_token){
      fetchTaskList(cookies.access_token)
    }
    else{

    }
  },[cookies,refresh])


  return (
    <div className='flex flex-col gap-7 h-full' >

      <section id="head" className="flex justify-between flex-col sm:flex-row gap-y-4.5">
        <section id="welcome" className='' >
          <h1 className=' text-[25px]  font-bold pb-1.5' >All Tasks</h1>
          <p className='font-semibold text-[15px] truncate  text-black/50' >Manage and organize your tasks efficiently.</p>
        </section>
        <div className='flex items-center ' >
          <Link to={'/tasks/add'} className=" hover:bg-blue-700/80 duration-200 ease-linear transition-all font-medium w-full place-content-center p-1.5 px-4 capitalize block text-center sm:text-start  rounded-2xl bg-blue-700 text-white">
          <span className='text-lg' >+</span> Create Task
          </Link>
        </div>
      </section>
    
      <SearchBare filter={filter} refresh={refresh} setRefresh={setRefresh} setFilter={setFilter} handleChange={handleChange} />
      {
        tasks?
          tasks.length > 0?
            <TaskList tasks={tasks} refresh={refresh} setRefresh={setRefresh} />
            :
             <div className=" flex flex-col justify-center items-center gap-2 col-span-12 bg-gray-100 min-h-40 rounded-2xl w-full h-full">
                  <div><Archive/></div>
                  <span>No tasks yet.</span> 
                  <Link to={'/tasks/add'} className='text-blue-600 hover:text-blue-600/80' >Create your first task to get started</Link>
              </div>
        :
          <Loading title={"Task list"} />
      }
    </div>
  )
}
