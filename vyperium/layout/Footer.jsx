import Image from "next/image"
import { FaTwitter, FaGithub } from 'react-icons/fa';
import Link from "next/link";

const Footer = () => {
  return (
<<<<<<< HEAD
    <footer className="bg-wp mt-[3rem] pt-[6rem] pb-[4rem] text-white">
      <div className="w-[80%] mx-auto">
        <div className=" flex justify-evenly items-center pb-[3rem] border-b-[1px] border-[#808080]">
          <div className=" w-[18%] mr-[2rem]">
            <Image src="/images/vyperiumlogo.jpeg" width={47} height={1} /> 
            <p className=" font-openSans pt-[1rem]"> </p>
          </div>
          <div className="w-full  justify-between items-center md:flex-row flex-col pt-6  border-t-[#3F3E45] font-bold">
            <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
                Venom
            </p>
        </div>
=======
    <footer className="pt-[2rem] flex flex-col md:flex-row md:items-center md:w-[80%] w-[90%] md:justify-between text-white mx-auto">
      <div className="flex cursor-pointer font-instrumentSerif text-[1.7rem] items-center">
        <Image alt="vyperiumlogo" src="/images/vyperiumlogo.jpeg" width={40} height={0.8} className="rounded-md" />
        <div className="px-5 font-bold text-3xl">
        Vyperium
>>>>>>> 6cc4f48271d01272df80bb3b19cc08b4c31a87d1
        </div>
      </div>
      <nav className="font-raleway bg-[#0C0C0C] md:bg-transparent flex flex-col md:flex-row md:w-[60%] md:leading-[1.5rem] leading-[5rem] ">
        <ul className="transition-[.5s] md:flex-1 md:justify-evenly font-semibold flex flex-col md:flex-row cursor-pointer">
          <li className="hover:text-[#008000]">Home</li>
          <li className="hover:text-[#008000]">About</li>
          <li className="hover:text-[#008000]">Faqs</li>
          <a href="https://drive.google.com/file/d/1ZlE8WZkXI6dWDOk9DZYnLH-F4HOUy_nE/view" target="blank">
            <li className="hover:text-[#008000]">Docs</li>
          </a>
        </ul>
        <div className="flex ml-[-1rem] md:mr-0 md:justify-center ">
          <div className="px-5">
          <a href='https://twitter.com/Vyperium_' target="blank">
            <FaTwitter className="w-5 h-5"/>
          </a>
          </div>
          <div className="px-5">
          <a href='https://github.com/OSAMOR19/VENOM-HACKHATHON' target="blank">
          <FaGithub className="w-5 h-5"/>
          </a>
          </div>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
