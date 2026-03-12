import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { fetchUserTasks, filterUserTasks } from '../features/api';
import TaskList from '../components/TaskList';
import SearchBare from '../components/SearchBare';
import Loading from "../features/Loading"


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
    }
    else if(filter){
      filterTaskList(cookies.access_token)
    }
    else if(cookies.access_token){
      fetchTaskList(cookies.access_token)
    }
  },[cookies,refresh])


  return (
    <div className='flex flex-col gap-7' >

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
            <div className='w-full text-xl font-semibold bg-white rounded-2xl border border-gray-300 min-h-40 grid place-content-center ' >
              <p>taches introvable </p>
            </div>
        :
          <Loading title={"Task list"} />
      }
    </div>
  )
}
