import Image from "next/image"
import Connectwallet from "@/pages/venom-connect/connectwallet"
import { useRef } from "react"


const Navigation = () => {
  const navRef= useRef()
	const burgerRef = useRef()

  const handleClick=()=>{
		navRef.current.classList.toggle("showNav")
		burgerRef.current.classList.toggle("burgerNav")	
	}

  return (
    <header className="pt-[2rem] flex md:items-center md:w-[80%] w-[90%] justify-between text-white mx-auto">
      <div className="flex cursor-pointer font-instrumentSerif text-[1.7rem] items-center">
        <Image src="/images/vyperium-logo.svg" width={47} height={1} />
        Vyperium
      </div>
      <nav ref={navRef} className="mainNav font-raleway bg-[#0C0C0C] md:bg-transparent flex flex-col md:flex-row md:w-[60%] md:leading-[1.5rem] leading-[5rem] text-center items-center">
        <ul className=" md:flex-1 md:justify-evenly flex flex-col md:flex-row">
          <li>Careers</li>
          <li>Blog</li>
          <li>Help Center</li>
          <li>Community</li>
        </ul>
        <Connectwallet/>
      </nav>
      <div onClick={handleClick} ref={burgerRef} className=" pr-4 space-y-1 block md:hidden z-[999] fixed right-0">
        <svg width="21" className=" " height="2" viewBox="0 0 21 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.38647 1H19.3865" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="21" height="2" viewBox="0 0 21 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.38647 1H19.3865" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="21" height="2" viewBox="0 0 21 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.38647 1H19.3865" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </header>
  )
}

export default Navigation
