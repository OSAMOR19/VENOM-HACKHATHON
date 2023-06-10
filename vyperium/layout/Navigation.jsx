import Image from "next/image"
import Link from "next/link";
import { FaTwitter, FaGithub } from 'react-icons/fa';
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
        <Image alt="vyperiumlogo" src="/images/vyperiumlogo.jpeg" width={40} height={0.8} className="rounded-md" />
        <div className="px-5 font-bold text-3xl">
        Vyperium
        </div>
      </div>
      <nav ref={navRef} className="mainNav font-raleway bg-[#0C0C0C] md:bg-transparent flex flex-col md:flex-row md:w-[60%] md:leading-[1.5rem] leading-[5rem] text-center items-center">
        <ul className=" md:flex-1 md:justify-evenly font-semibold flex flex-col md:flex-row cursor-pointer">
          <li className="hover:text-[#008000]">Home</li>
          <li className="hover:text-[#008000]">About</li>
          <li className="hover:text-[#008000]">Faqs</li>
          <a href="https://drive.google.com/file/d/1ZlE8WZkXI6dWDOk9DZYnLH-F4HOUy_nE/view" target="blank">
            <li className="hover:text-[#008000]">Docs</li>
          </a>
        </ul>
        <div className="flex justify-center ">
          <div className="px-5">
          <a href='https://twitter.com/Vyperium_' target="_self">
            <FaTwitter className="w-5 h-5"/>
          </a>
          </div>
          <div className="px-5">
          <a href='https://github.com/OSAMOR19/VENOM-HACKHATHON' target="_self">
            <FaGithub className="w-5 h-5"/>
          </a>
          </div>
        </div>
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
