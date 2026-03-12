import React from 'react'
import { Calendar,ArrowRight} from 'lucide-react';

export default function RecentTask({title,type,preiority,date,isTheLastOne}) {

  const styles = {
      Pending:{
          bg:"bg-orange-100",
          color:"text-orange-500"
      },
      Completed:{
          bg:"bg-green-100",
          color:"text-green-500"
      },
      Low:{
          bg:"bg-blue-100",
          color:"text-blue-500"
      },
      Medium:{
          bg:"bg-orange-100",
          color:"text-orange-500"
      },
      High:{
          bg:"bg-red-100",
          color:"text-red-500"
      }
    }

  const d = new Date(date);
  const formattedDate = d.toLocaleDateString('en-US', {
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  });


  return (
    <div className={` border-t  ${isTheLastOne ? "rounded-b-2xl border-b":"border-b-0"} bg-white  border  border-gray-300 hover:bg-gray-100 duration-200 transition-all ease-linear grid grid-cols-4  px-7 py-3 items-center `} >
      <section className='col-span-4 sm:col-span-2 '>
          <h3 className='text-sm capitalize font-medium truncate text-black/85 ' > {title} </h3>
          <span className='py-1 place-content-center gap-2 text-black/55' ><Calendar className='inline-block size-3.5' /> <span className='text-[13px]' >{formattedDate}</span></span>
      </section>
      <div className=' col-span-4 pt-1 sm:col-span-2 flex gap-3 sm:justify-end' >
          <span className={`rounded-lg text-sm px-2 capitalize
          ${styles[type].color} ${styles[type].bg} 
             `}>{type}</span>
          <span className={`rounded-lg text-sm px-2 capitalize 
          ${styles[preiority].color} ${styles[preiority].bg}
            `}>{preiority}</span>
      </div>
    </div>  
  )
}
 
