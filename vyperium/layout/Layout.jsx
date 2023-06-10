import AppNav from "./AppNav"
import Footer from "./Footer"
import Navigation from "./Navigation"
import { useData } from "@/context/DataContext";



const Layout = ({children}) => {
  const {isOnApp} = useData()
  return (
    <div>
        {isOnApp ? <AppNav /> : <Navigation />}
        {children}
        {!isOnApp && <Footer />}
    </div>
  )
}

export default Layout
