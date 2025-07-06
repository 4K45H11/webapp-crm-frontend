import { useEffect, useState } from "react"
import useFetch from "./useFetch"

export const usegetLastWeekReport = () => {

    const [lastWeekClosed, setLastWeekClosed] = useState()
    const { data, loading, error } = useFetch(`https://webapp-crm.vercel.app/report/last-week`)

    useEffect(() => {
        if (data) {
            setLastWeekClosed(data)
        }
    }, [data])


    return {lastWeekClosed}
}

export const usegetInPipeLine = ()=>{
    const [inPipeLine,setInPipeLine] = useState()
    const {data,loading,error} = useFetch(`https://webapp-crm.vercel.app/report/pipeline`)

    useEffect(() => {
        if (data) {
            setInPipeLine(data)
        }
    }, [data])

    return {inPipeLine}
}