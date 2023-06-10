import AppNav from "./AppNav"
import Footer from "./Footer"
import Navigation from "./Navigation"
import { useData } from "@/context/DataContext";



const Layout = ({children}) => {
  const {isOnApp} = useData()
  return (
    <div>
<<<<<<< HEAD
        <Navigation /> 
       {/* <AppNav />*/}
        {children}
         <Footer /> 
=======
        {isOnApp ? <AppNav /> : <Navigation />}
        {children}
        {!isOnApp && <Footer />}
>>>>>>> 6cc4f48271d01272df80bb3b19cc08b4c31a87d1
    </div>
  )
}

export default Layout
