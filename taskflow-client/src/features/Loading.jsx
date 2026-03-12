import React from 'react'

export default function Loading({title}) {
  return (
    <div className="flex gap-2 col-span-12 bg-white rounded-2xl w-full  justify-center items-center min-h-40">
        <div className='size-4 border-2 border-blue-600 border-dotted border-bs-0 animate-spin rounded-full' ></div>
        <p className='' >Loading {title}...</p>
    </div>
  )
}
