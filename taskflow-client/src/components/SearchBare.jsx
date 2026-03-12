import React from 'react'

export default function SearchBare({filter,setFilter,handleChange,refresh,setRefresh}) {

    const onChange = async (e)=>{
        const {value,name} = e.target ;
        await setFilter({...filter,[name]:value})
        await handleChange()
        await setRefresh(!refresh)

    }

  return (
    <section className=' flex flex-col sm:flex-row gap-4  border border-gray-300 rounded-2xl p-4' >

        <input name='title' onChange={onChange} type="text" className=' sm:flex-1 
        focus:outline-none bg-(--background) focus:ring-2 focus:ring-blue-500 
        rounded-3xl  border border-gray-300 py-1.5 ps-5 text-md  placeholder:text-gray-500 
        font-medium ' placeholder='Search tasks...' />
        
        <div className='flex gap-4 ' >
            <select onChange={onChange} className='focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl border border-gray-300 capitalize px-4 py-1.5 ' name="status" id="">
                <option value="">all status</option>
                <option value="Pending">pending</option>
                <option value="Completed">completed</option>
            </select>
            <select onChange={onChange} className='focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl border border-gray-300 capitalize px-4 py-1.5' name="priority" id="">
                <option value="">all priority</option>
                <option value="Low">low</option>
                <option value="Meduim">meduim</option>
                <option value="High">high</option>
            </select>
        </div>
    </section>
  )
}
