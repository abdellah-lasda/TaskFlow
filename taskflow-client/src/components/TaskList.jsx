import { deleteTask, markedcomplet } from '../features/api'
import Task from './Task'
import { useCookies } from "react-cookie"
import { toast } from "react-toastify";


export default function TaskList({tasks,refresh,setRefresh}) {

    const [cookies,setCookies,removeCookies] = useCookies(['access_token'])

    const handleDelete = async (id,token)=>{
        const result = await confirm('vous vous lait vraiment supprimer cette tache ?')
        if(result){
            try {
                await deleteTask(id,token)
                await setRefresh(!refresh)
                toast.success("Tâche supprimer avec succès");
            } catch (error) {
                toast.error("Erreur lors de la suppresion de la tâche");
            }
        }
    }

    const setCompleted = async (id,token)=>{
        const result = await confirm('vous vous l ait vraiment set cette tache comme complet?')
        if(result){
            try {
                await markedcomplet(token,id)
                await setRefresh(!refresh)
                toast.success("Tâche completed avec succès");
            } catch (error) {
                toast.error("Erreur lors de changement de status de la tâche");
            }
        }
    }

  return (
    <div className='gap-4 w-full grid grid-cols-12 ' >
        {
            tasks.map((e,k)=>{ return (
                <Task 
                    id={e._id}
                    date={e.Due_Date} 
                    preiority={e.Priority} 
                    title={e.Title} 
                    type={e.Status} 
                    key={k} 
                    descrription={e.Description} 
                    onDelete={()=>handleDelete(e._id,cookies.access_token)} 
                    setCompleted={()=>setCompleted(e._id,cookies.access_token)}
                />)
            })
        }
    </div>
  )
}
