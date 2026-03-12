import { Sun , Menu , X,LogOut , Zap,Settings,LayoutDashboard,SquareCheckBig,CirclePlus} from 'lucide-react';
import { useState ,useEffect} from 'react'
import { Link, useMatches, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { Outlet } from "react-router-dom";
import { fetchUserInfo } from '../features/api';
import {toast} from "react-toastify"




export default function MainLayout() {
    const [hidde,setHidde] = useState(true);
    const navigate = useNavigate();
    const matches = useMatches()
    const currentRoute = matches[matches.length - 1]
    const title = currentRoute.handle?.title || "dashboard"
    const current =  currentRoute.handle?.current || "dashboard"
    const [user,setUser] = useState({})
    const [cookies,setCookies,removeCookies] = useCookies(['access_token'])

    const handleLogout = ()=>{
        removeCookies("access_token")
        toast.success("log out from your account succesfuly");
        navigate('/')
    }

    const handleLink = (to)=>{
        setHidde(true)
        navigate(to)
    }

    const fetchUser = async (token)=>{
        const result = await fetchUserInfo(token)
        setUser(result)
    }

    useEffect(()=>{
        if(!cookies.access_token){
            navigate("/")
            toast.error("accés non autoriseé");
        }
        else if (cookies.access_token){
            fetchUser(cookies.access_token)
        }
    },[cookies])


  return (
    <section className='' >
        {/* HEADER */}
        <header className=' left-0 lg:left-66 border-b border-b-gray-200 fixed top-0 lg:w-[calc(100%-264px)] w-full gap-8 h-15  p-3 sm:p-6  flex items-center justify-between bg-[#fdfcff]  ' >
            <div className=' flex justify-center items-center sm:gap-5 gap-3' >
                <span className=' lg:hidden  hover:bg-blue-100/30 rounded-xl grid place-content-center p-2 ' onClick={()=>setHidde(false)} ><Menu className='size-5'/></span>
                <h4 className='font-semibold capitalize text-lg ' >{title}</h4>
            </div>
            <div className="flex gap-2">
                <span className='p-2 hover:bg-blue-100/30 grid place-content-center rounded-full' ><Sun className='size-5' /></span>
                <span className='p-2 hidden sm:block  bg-blue-200/30 font-semibold rounded-full '>
                    <span className="size-5 text-blue-900 grid place-content-center -mt-0.5">A</span>
                </span>
            </div>
        </header>

        {/*  ASIDE MENU TABLET->PHONE */}
        <aside className={` ${hidde ?" hidden ":""} top-0 z-10 right-0 fixed w-full flex justify-between min-h-screen bg-black/50 `} >
            <div className={`border flex flex-col justify-between px-3 pb-6 pt-3 border-gray-200 min-w-66 h-screen bg-(--background) relative `} >
                <div>
                    <span id='exist' className='transition-all absolute top-4 right-3 duration-200 ease-linear inline-block border-2 border-(--background) rounded-md active:border-blue-800 p-0.5 ' onClick={()=>setHidde(true)}  >
                        <X className=' size-4 text-gray-700  ' />
                    </span>

                    <div id='taskflow-logo' className=" flex px-3 pt-4 pb-7 gap-2 items-center ">
                        <span className='p-2 rounded-2xl bg-blue-700' >< Zap className='size-5 text-white'  /></span>
                        <h2 className='text-xl font-bold ' >TaskFlow</h2>
                    </div>

                    <menu className=' text-gray-500 flex flex-col gap-1' >

                        <button  onClick={()=>handleLink('/dashboard')} className={` duration-300 ease-linear transition-all hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center 
                            gap-3 ${current === "dashboard" ? " bg-blue-600 text-white ":"hover:bg-[#e4e4ec] hover:text-black" }`} >
                            <LayoutDashboard className='size-4.5' /> <span className='text-[16px] ' >dashboard</span>
                        </button>
                        <button  onClick={()=>handleLink('/tasks')} className={` duration-300 ease-linear transition-all  hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center 
                            gap-3 ${current === "tasks" ? " bg-blue-600 text-white ":"hover:bg-[#e4e4ec] hover:text-black" } `} >
                            <SquareCheckBig className='size-4.5' /> <span className='text-[16px] ' >all tasks</span>
                        </button>
                        <button  onClick={()=>handleLink('/tasks/add')} className={` duration-300 ease-linear transition-all  hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center 
                            gap-3 ${current === "create" ? " bg-blue-600 text-white ":"hover:bg-[#e4e4ec] hover:text-black" } `} >
                            <CirclePlus className='size-4.5' /> <span className='text-[16px] ' >create task</span>
                        </button>
                        <button  onClick={()=>handleLink('/settings')} className={` duration-300 ease-linear transition-all  hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center 
                            gap-3 ${current === "settings" ? " bg-blue-600 text-white ":"hover:bg-[#e4e4ec] hover:text-black" } `} >
                            <Settings className='size-4.5 ' /> <span className='text-[16px] ' >settings</span>
                        </button>
                        <div  className='hover:bg-red-100 hover:cursor-default duration-300 ease-linear transition-all hover:text-red-600 hover: py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center gap-3 ' onClick={handleLogout} >
                            <LogOut className='size-4.5 ms-0.5' /> <span className='text-[16px] ' >logout</span>
                        </div>
                    </menu>
                    

                </div>
                <section id="profile" className=' border border-gray-200 rounded-2xl flex gap-3 px-3 py-3.5   items-center bg-[#f5f5fa]  ' >
                    <span className='p-2 inline-block  bg-blue-200/30 font-semibold rounded-full '>
                        <span className="size-5 text-blue-700 grid place-content-center -mt-0.5">A</span>
                    </span>
                    <div className='' >
                        <p className='font-medium truncate max-w-[99%]  text-[15px] ' >{user.Name}</p>
                        <p className='text-sm max-w-[99%] truncate  text-gray-500' >{user.Email}</p>
                    </div>
                </section>
            </div>
            <div className=' h-screen w-full rounded-xl ' onClick={()=>setHidde(true)}  >
            </div>
        </aside>

        <main className='z-0 bg-(--background) py-6 px-3 sm:py-6 sm:px-3.5 lg:p-7 fixed lg:left-66 lg:w-[calc(100%-264px)] overflow-y-auto top-15 h-[calc(100%-60px)] w-full  ' >
            <Outlet/>
        </main>

        {/*  ASIDE MENU FIXED PC */}
        <aside className={` hidden border lg:flex z-10 flex-col justify-between px-3 pb-6 pt-3 border-gray-200 w-66 h-screen bg-white `} >
            <div>
                <div id='taskflow-logo' className=" flex px-3 pt-4 pb-7 gap-2 items-center ">
                    <span className='p-2 rounded-2xl bg-blue-700' >< Zap className='size-5 text-white'  /></span>
                    <h2 className='text-xl font-bold ' >TaskFlow</h2>
                </div>

                <menu className=' text-gray-500 flex flex-col gap-1' >

                    <Link to={"/dashboard"} className={` duration-300 ease-linear transition-all hover:text-black hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center
                         gap-3 ${ current === "dashboard" ? "bg-blue-600 text-white ":"hover:bg-[#e4e4ec]"} `} >
                        <LayoutDashboard className='size-4.5' /> <span className='text-[16px] ' >dashboard</span>
                    </Link>
                    <Link to={"/tasks"} className={`duration-300 ease-linear transition-all hover:text-black hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center
                         gap-3 ${ current === "tasks" ? "bg-blue-600 text-white ":"hover:bg-[#e4e4ec]"} `} >
                        <SquareCheckBig className='size-4.5' /> <span className='text-[16px] ' >all tasks</span>
                    </Link>
                    <Link to={"/tasks/add"} className={`duration-300 ease-linear transition-all hover:text-black hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center
                         gap-3 ${ current === "create" ? "bg-blue-600 text-white ":"hover:bg-[#e4e4ec]"} `} >
                        <CirclePlus className='size-4.5' /> <span className='text-[16px] ' >create task</span>
                    </Link>
                    <Link  to={"/settings"} className={`duration-300 ease-linear transition-all hover:text-black hover:cursor-pointer py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center
                         gap-3 ${ current === "settings" ? "bg-blue-600 text-white ":"hover:bg-[#e4e4ec]"} `} >
                        <Settings className='size-4.5 ' /> <span className='text-[16px] ' >settings</span>
                    </Link>
                    <div className='hover:bg-red-100 hover:cursor-default duration-300 ease-linear transition-all hover:text-red-600 hover: py-2.5 px-5 capitalize rounded-2xl font-medium flex items-center gap-3 ' 
                        onClick={handleLogout}><LogOut className='size-4.5 ms-0.5' /> <span className='text-[16px] ' >logout</span>
                    </div>

                </menu>

            </div>
            <section id="profile" className=' border border-gray-200 rounded-2xl flex gap-3 px-3 py-3.5   items-center bg-[#f5f5fa]  ' >
                <span className='p-2 inline-block  bg-blue-200/30 font-semibold rounded-full '>
                    <span className="size-5 text-blue-700 grid place-content-center -mt-0.5">A</span>
                </span>
                <div className='' >
                    <p className='font-medium truncate max-w-[99%]  text-[15px] ' >{user.Name}</p>
                    <p className='text-sm max-w-[99%] truncate  text-gray-500' >{user.Email}</p>
                </div>
            </section>
        </aside>
    </section>
    
  )
}
