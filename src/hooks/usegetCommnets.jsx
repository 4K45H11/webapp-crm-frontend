import { useEffect, useState } from "react"
import useFetch from "./useFetch"

const useGetComment = (init)=>{

    const [comments,setComments] = useState()
    const[load,setLoad]= useState()
    const [err,setErr] = useState()

    const {data,loading,error} = useFetch(`https://webapp-crm.vercel.app/leads/comments/${init}`)

    useEffect(()=>{
        if(data){
            setComments(data);
            setLoad(loading);
            setErr(error)
        }
        
    },[data])

    return {comments,load,err}
    
}

export default useGetComment;