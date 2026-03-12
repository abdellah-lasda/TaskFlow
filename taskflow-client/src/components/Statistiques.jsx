import React, { useState ,useEffect } from 'react'
import Card from "./Card"
import { useCookies } from "react-cookie"
import { fetchStatistiques } from '../features/api'
import Loading from '../features/Loading'

export default function Statistiques() {
    const [info,setInfo] = useState(null)
    const [cookies,setCookies,removeCookies] =useCookies(['access_token'])

    const fetchS = async (token)=>{
      const statistiques = await fetchStatistiques(token)

      setInfo({
        totalObject: {titre:"total tasks",valeur:statistiques?.total,name:"total"} ,
        completedObject: {titre:"completed",valeur:statistiques?.completed,name:"completed"} ,
        pendingObject: {titre:"pending",valeur:statistiques?.pending,name:"pending"} ,
        hightObject: {titre:"hight priority",valeur:statistiques?.hight,name:"hight"}
      });
    }

    useEffect(()=>{
        if(!cookies.access_token){
          navigate("/")
        }
        else if(cookies.access_token){
          fetchS(cookies.access_token)
        }
    },[cookies])

    
    
    
    
  return (
    <div className={'gap-4 grid grid-cols-12 px-1 '} >
      {info?<>
        <Card object={info.totalObject} />
        <Card object={info.completedObject} />
        <Card object={info.pendingObject} />
        <Card object={info.hightObject} />
      </>
      :
      <Loading title={"Statistiques"} />
    }
    </div>
  )
}
