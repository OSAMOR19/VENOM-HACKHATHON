import AppNav from "./AppNav"
import Footer from "./Footer"
import Navigation from "./Navigation"


const Layout = ({children}) => {
  return (
    <div>
        {/* <Navigation /> */}
        
        {children}
        {/* <Footer /> */}
    </div>
  )
}

export default Layout
