import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/pages/venom-connect/button";




const AppNav = () => {
    const navRef = useRef()
    const burgerRef = useRef()
    const router = useRouter();
    const navLinks = [
		{ key: 1, title: "Your Wallet", path: "/app/Wallet", iconSrc: "/images/wallet.svg"},
		{ key: 2, title: "Overview", path: "/app/Overview", iconSrc: "/images/eye.svg"},
		{ key: 3, title: "Explore", path: "/app/Explore", iconSrc: "/images/compass.svg" },
		{ key: 4, title: "Send", path: "/app/Send", iconSrc: "/images/send-vector.svg" },
		{ key: 5, title: "Swap", path: "/app/Swap", iconSrc: "/images/swap.svg"},
		{ key: 6, title: "Bridge", path: "/app/Bridge", iconSrc: "/images/bridge.svg" },
		{ key: 7, title: "Settings", path: "", iconSrc: "/images/setting.svg" },
	];


	const links = navLinks.map((link) => (
		<li key={link.key} className={router.pathname === link.path ? "active" : ""}>
			<Link className="pl-[1rem] font-Inter flex items-center hover:bg-[#008000] hover:rounded-[5px] py-[.7rem] transition-[.5s] gap-3" href={link.path}>
                <Image src = {link.iconSrc} alt = "appIcon" height ={1} width = {20} />
                {link.title}
            </Link>
		</li>
	));

    const showNav = () => {
        burgerRef.current.classList.toggle("burgerNav")	
        if (navRef.current.classList.contains("translate-x-[-20rem]")) {
            navRef.current.classList.remove("translate-x-[-20rem]")
        }
        else {
            navRef.current.classList.add("translate-x-[-20rem]")
        }
    }

 
  return (
    <>
        <aside 
            ref = {navRef} 
            className="md:top-0 z-[9] bottom-0 transition-[.6s] text-white bg-[#1D1D21] fixed h-[100vh] md:w-[15%] w-[75%] top-[2rem] md:translate-x-0 translate-x-[-20rem]">
            <div className="text-center border-b pb-[1.5rem]">
                <h2 className="px-2 mt-[2.5rem] font-Inter">Welcome to Vyperium</h2>
                <p className="px-2 text-[.8rem] font-Inter pt-[1rem] pb-[1rem]">Connect your Venom wallet to manage your DeFi portfolio</p>
                <div className=" w-[90%] mx-auto">
                    <Button />
                </div>
            </div>
            <nav className=" pt-[2rem]">
                <ul className=" space-y-1">
                    {links}
                </ul>
            </nav>
        </aside>
        <header className="flex bg-[#0C0C0C] z-10 justify-between pt-[1rem] border-b border-b-[#808080] pb-3 text-white fixed top-0 left-[2%] md:left-[22%] right-[2%] md:right-[7%]">
            <div className="cursor-pointer flex gap-2 items-center">
                <Image src= "/images/vyperiumlogo.jpeg" alt ="gas" height={1} width={30}/>
                <h1 className="text-[1.5rem] font-instrumentSerif font-[500]">Vyperium</h1>
            </div>
            <div className=" hidden">
                <div className=" flex items-center gap-2">
                    <div className="font-poppins flex gap-1 items-center">
                        <Image src= "/images/gas.svg" alt ="gas" height={1} width={20}/>
                        85
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <div className="font-poppins flex items-center">
                        USD
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <div className=" flex items-center">
                        <Image src= "/images/help.svg" alt ="gas" height={1} width={20}/>
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <div>
                        <Image src= "/images/eye.svg" alt ="gas" height={1} width={20}/>
                    </div>
                </div>
            </div>
            <div onClick={showNav} ref={burgerRef} className=" pr-4 space-y-1 block md:hidden z-[999] fixed right-0">
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
    </>
  )
}

export default AppNav
