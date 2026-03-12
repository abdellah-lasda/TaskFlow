import React from 'react'
import { Calendar,Trash2,Pencil,SquareCheckBig   } from 'lucide-react';
import {Link} from "react-router-dom"



export default function Task({id,title,type,preiority,descrription,date,onDelete,setCompleted}) {

  const d = new Date(date);
  const formattedDate = d.toLocaleDateString('en-US', {
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  });

  return (
    <div className='rounded-xl text-sm col-span-12 md:col-span-6 xl:col-span-4 duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl shadow border border-gray-300 bg-white p-7' >
      <div className='flex justify-between' >
        <h2 className=' capitalize font-medium text-[16.5px] line-clamp-1 ' >{title}</h2>
        <span className={`rounded-lg text-sm place-content-center  px-2 capitalize ${ type === "Completed" ? "text-green-700 bg-green-200" : "text-orange-400 bg-orange-200" } `} >{type}</span>
      </div>

      <p className='py-2 line-clamp-2 font-medium text-black/50' >{descrription}</p>

      <span className='py-2 text-sm flex items-center gap-2 text-black/55' > <Calendar className='inline-block size-4' /> {formattedDate}</span>
      
      <div className="card-f">
        <hr className='py-2' />
        <div className='flex justify-between items-center' >
          <span className={`rounded-lg text-sm  px-2 capitalize ${ preiority === "Low" ? "text-green-700 bg-green-200" : preiority === "Medium" ?"text-orange-400 bg-orange-200" : "text-red-700 bg-red-200"} `} >{preiority}</span>
          <div className=' flex text-black/55 items-center ' >
            <Link to={`/task/${id}/edit`} className=' transition-all duration-100 ease-linear hover:bg-blue-100/80 p-2 rounded-xl hover:text-blue-800' ><Pencil className='inline-block size-4  ' /></Link>
            <span className=' transition-all duration-100 ease-linear hover:bg-blue-100/80 p-2 rounded-xl hover:text-red-800 ' onClick={onDelete}  ><Trash2 className='inline-block size-4 ' /></span>
            {
              type !== "Completed"?
              <span className=' transition-all duration-100 ease-linear hover:bg-blue-100/80 p-2 rounded-xl hover:text-green-800' onClick={setCompleted}  ><SquareCheckBig className='inline-block size-4  ' /></span>
              :""
            }
          </div> 
        </div>
      </div>
    </div>
    
  )
}
