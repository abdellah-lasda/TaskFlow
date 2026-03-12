import React from 'react'
import { ClipboardList,CircleCheck,Clock4,TriangleAlert  } from 'lucide-react';


export default function Card({object}) {
    const {titre,valeur,name} = object

    const styles = {
        total:{
            border:"border-s-purple-700 border-b-purple-700",
            bg:"bg-purple-700",
            icon:<ClipboardList className="size-7"/>
        },
        completed:{
            border:"border-s-green-500 border-b-green-500",
            bg:"bg-green-500",
            icon:<CircleCheck className="size-7"/>
        },
        pending:{
            border:"border-s-orange-500 border-b-orange-500",
            bg:"bg-orange-500",
            icon:<Clock4 className="size-7"/>
        },
        hight:{
            border:"border-s-red-500 border-b-red-500",
            bg:"bg-red-500",
            icon:<TriangleAlert className="size-7"/>
        }
    }

    return (
        <div className={`border flex justify-between border-gray-300 border-s-4 border-b-4 ${styles[name].border}  rounded-xl text-sm col-span-12 md:col-span-6 xl:col-span-3 duration-250 ease-in-out hover:-translate-y-0.5 hover:shadow-md shadow bg-white px-7 py-5.5`}>
            <div>
                <span className='block text-3xl font-bold pb-1'>{valeur}</span>
                <span className='capitalize font-semibold text-[15px] text-gray-950/50'>{titre}</span>
            </div>
            <div className='flex items-center' >
                <span className={`p-2.5 ${styles[name].bg} text-white grid place-content-start rounded-2xl`}>
                    {styles[name].icon}
                </span>
            </div>
        </div>
    )
}



   