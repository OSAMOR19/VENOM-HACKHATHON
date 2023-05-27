import { useState,useContext,createContext } from "react";

const DataContext=createContext()
const {Provider}= DataContext

const DataGet=({children})=>{
    const [isConnected, setIsConnected] = useState(false)
    const [connectedAddr, setCnnctdAddr] = useState()

    return(
        <Provider value={{isConnected, setIsConnected, connectedAddr, setCnnctdAddr}}>
            {children}
        </Provider>
    )
}

const useData=()=>useContext(DataContext)

export {useData,DataGet}