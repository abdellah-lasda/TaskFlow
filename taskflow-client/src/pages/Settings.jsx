import React from 'react'

export default function Settings() {
  return (
    <div className='w-full px-3 sm:px-5 h-full ' >
      <h1 className='font-bold text-3xl' >Settings</h1>
      <p className='font-medium text-gray-400 mt-1' >Manage your preferences and account information.</p>

      <section className='bg-white border border-gray-300 rounded-2xl p-5 px-8' >
        <div>
          <h2 className='text-lg font-medium' >Appearance</h2>
          <p className='text-sm font-medium text-gray-500 mt-1' >Customize how TaskFlow looks on your device.</p>
        </div>
        <hr className='text-gray-200 my-2 ' />
        <div className='flex justify-between' >
          <div className='flex gap-3' >
            <div id="icon">icon</div>
            <div>
              <h2 className='text-[16px] font-medium' >dark Mode</h2>
              <p className='text-sm  text-gray-400 ' >Switch between light and dark themes</p>
            </div>
          </div>
          <button id="radio">radio</button>
        </div>
      </section>

      <section className='bg-white border border-gray-300 rounded-2xl p-5 px-8' >
        <div>
          <h2 className='text-lg font-medium' >Account</h2>
          <p className='text-sm font-medium text-gray-500 mt-1' >Your personal account information.</p>
        </div>
        <hr className='text-gray-200 my-2 ' />
        <div id="infoContainer">

        </div>
      </section>
    </div>
  )
}
