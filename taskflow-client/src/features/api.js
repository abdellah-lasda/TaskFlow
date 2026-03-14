import axios from "axios"

const url = "http://localhost:5000/api/" ;// register - login => post


export const login = async (Email,Password)=>{
    const result = await axios.post(`${url}auth/login`,{Email,Password});
    return await result.data
}

export const register = async (info)=>{
    console.log(info)
    const {data:result} = await axios.post(`${url}auth/register`,info);
    return result
}

export const fetchUserInfo =  async (token)=>{
    const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
    const result = (await axios.get(`${url}user/`, authorization )).data;
    return result;
}

export const fetchUserTasks = async (token)=>{
    const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
    const result = await (await axios.get(`${url}task/`,authorization)).data;
    // console.log(result)
    return result ;
}

export const deleteTask = async (id,token)=>{
    const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
    try{
        const result = await (await axios.delete(`${url}task/delete/${id}`,authorization)).data;
        // console.log(result)
    }
    catch(err){
        console.log(err)
    }
    
}

export const fetchStatistiques = async (token)=>{
    const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
    try{
        const {total,completed,pending,hight} = (await axios.get(`${url}task/stat`, authorization )).data;
        return {total,completed,pending,hight} ;
    }
    catch(err){
        console.log(err)
    }
}

export const fetchRecentTasks = async (token)=>{
    const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
    try{
        const {data:result} = await axios.get(`${url}task/find?limit=5`, authorization );
        return result.tasks
    }
    catch(err){
        console.log(err)
    }
}

// task/find?....
export const filterUserTasks = async (token,filter)=>{
    try{
        const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
        const fliterTabe = []
        filter?.status ? fliterTabe.push(`status=${filter.status}`) : ""

        filter?.priority ? fliterTabe.push(`priority=${filter.priority}`)  : ""
        
        filter?.title ? fliterTabe.push(`title=${filter.title}`)  : ""

        const str = fliterTabe.length > 0 ? "?"+fliterTabe.join("&"): ""
   
        const {data:result} = await axios.get(`${url}task/find${str.replace(",","&")}`, authorization );
        return result.tasks
    }
    catch(err){
        console.log({'message':`fetching user tasks transaction are failed ${err}`})
    }
}

// create new task
export const createTask = async (token,tache)=>{
    try{
        const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
        const {data:result} = await axios.post(`${url}task/add`,tache,authorization);
        return result
    }catch(err){
        console.log({'message':`add task transaction are failed ${err.message}`})
    }

}

// update task
export const updateTask = async (token,id,tach)=>{
    try{
        const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
        const {data:result} = await axios.put(`${url}task/edit/${id}`,tach,authorization);
        return result
    }catch(err){
        return {success:false,'message':`update task transaction are failed ${err.message}`}
    }
}

// marked task completed
export const markedcomplet = async (token,id)=>{
    try{
        const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
        const {data:result} = await axios.put(`${url}task/markedcomplet/${id}`,{},authorization);
        console.log(result)
        return result
    }catch(err){
        console.log({'message':`marke task completed transaction are failed ${err.message}`})
    }
}


// fetch task info 
export const fetchTaskInfo = async (token,id)=>{
    const authorization =  { headers:{ Authorization: `Bearer ${token}` } };
    const {data:result} = await axios.get(`${url}task/show/${id}`,authorization);
    return result ;
}

