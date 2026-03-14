import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from "react-router-dom"
import { login } from '../features/api'
import {useCookies} from "react-cookie"
import {Zap} from "lucide-react"
import {toast} from "react-toastify"

export default function Login() {
  const navigate = useNavigate()
  const [errors,setErrors] = useState({"email":"","password":""}) 
  const [info,setInfo] = useState({"email":"","password":""});
  const [cookies,setCookies] = useCookies(['access_token'])

  const handelChange = (e)=>{
    return setInfo({...info,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    if(cookies.access_token){
      navigate("/dashboard")
    }
  },[cookies])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = await login(info.email,info.password);
    if(!data.success){
        setErrors(data.errors)
    }
    else{
      setCookies("access_token",data.token)
      toast.success("Login successfuly.");
      navigate('/dashboard')
    }
  }

  return (
    <div onSubmit={handleSubmit} className='bg-(--background) min-w-96 w-full h-screen flex justify-center items-center p-5 ' >
      <form action="" className=' shadow border border-gray-300 max-w-120 xl:w-[40%] sm:w-[75%] md:w-[60%] lg:w-[50%] w-full bg-white p-7 rounded-xl' >
        <section className='w-full text-center mb-3' >
          <span className=' inline-block p-2 rounded-2xl bg-blue-700' >< Zap className='size-8 text-white'  /></span>
          <h2 className='text-3xl font-semibold capitalize ' >Welcome back</h2>
          <p className='text-black/45 mt-2'>Sign in to your TaskFlow account</p>
        </section>
          <ul>
            {errors.message?<div className=' mt-2 p-3 bg-red-300 '> {errors.message} </div>: ""}
            <li className='my-4' >
              <label className='mb-2 block' htmlFor="">Email</label>
              <input className={`${ errors.email || errors.message ?"border-red-500" :""}  mx-2 rounded-xl p-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 `} placeholder='abd@exemple.ma' name='email' type="text" onChange={handelChange} />
              { errors.email ? <span className='mx-2 text-sm text-red-500 ' >{errors.email}</span> : ""}
            </li>
            <li className='my-4' >
              <label className='mb-2 block' htmlFor="">Password</label>
              <input className={`${ errors.password || errors.message ?"border-red-500" :""}  mx-2 rounded-xl p-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 `} placeholder='password' name='password' type="password" onChange={handelChange} />
              { errors.password ? <span className='mx-2 text-sm text-red-500 ' >{errors.password}</span> : ""}
            </li>
            <li>
              <button type='submit' className=' mx-2 my-4 hover:cursor-pointer hover:bg-blue-700/80 duration-150 ease-linear transition-all mt-2 rounded-xl bg-blue-700 text-white p-2 w-full' >Sing in</button>
            </li>
            <li>
              <p className='text-black/50 font-medium text-center' >Don't have an account? <Link to={"/register"} className='text-blue-700  hover:text-blue-700/70 duration-300 ease-linear transition-all' >Register</Link></p>
            </li>

          </ul>
        </form>
    </div>
  )
}
