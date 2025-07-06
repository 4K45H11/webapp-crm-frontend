import { useEffect, useState } from "react"
import useFetch from "./useFetch"
const usegetAgents = ()=>{
    const [agents,setAgents] = useState([])
    const {data,loading,error} = useFetch(`https://webapp-crm.vercel.app/agents`)

    const[load,setLoad]= useState()
    const [err,setErr] = useState()

    useEffect(()=>{
        if(data){
            setAgents(data)
            setLoad(loading)
            setErr(err)
        }

    },[data])

    return {agents,load,err}
}

export default usegetAgents