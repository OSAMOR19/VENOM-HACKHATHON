import {useState, useContext, createContext, Children} from 'react'
const DataContext=createContext({})
const {Provider}= DataContext

const DataGet=({children})=>{
    const [isOnApp, setIsOnApp] = useState()
    return (
        <Provider value={{setIsOnApp, isOnApp}}>
            {children}
        </Provider>
    )
}

const useData=()=>useContext(DataContext)
export {useData,DataGet}