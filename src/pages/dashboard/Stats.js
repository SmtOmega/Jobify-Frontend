import { useEffect } from "react"
import ChartContainer from "../../components/ChartContainer"
import Loading from "../../components/Loading"
import StatsContainer from "../../components/StatsContainer"
import { useAppContext } from "../../context/AppContext"

const Stats = () => {

    const {showStats, isLoading, monthlyApplications} = useAppContext()

    useEffect(()=> {
        showStats()
        // eslint-disable-next-line
    }, [])

    if(isLoading){
        return <Loading center/>
    }
    return <>
    <StatsContainer />
    {monthlyApplications.length > 0 && <ChartContainer />}
    </>
}

export default Stats