import Connectwallet from "@/pages/venom-connect/connectwallet";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";




const AppNav = () => {
    const router = useRouter();
    const navLinks = [
		{ key: 1, title: "Overview", path: "/app/Overview", iconSrc: "/images/eye.svg"},
		{ key: 2, title: "Explore", path: "", iconSrc: "/images/compass.svg" },
		{ key: 3, title: "Favourites", path: "", iconSrc: "/images/star.svg" },
		{ key: 3, title: "Swap", path: "", iconSrc: "/images/swap.svg"},
		{ key: 3, title: "Settings", path: "", iconSrc: "/images/setting.svg" },
	];


	const links = navLinks.map((link) => (
		<li key={link.key} className={router.pathname === link.path ? "active" : ""}>
			<Link className="pl-[1rem] font-Inter flex items-center hover:text-[#008000] transition-[.5s] gap-3" href={link.path}>
                <Image src = {link.iconSrc} alt = "appIcon" height ={1} width = {20} />
                {link.title}
            </Link>
		</li>
	));

 
  return (
    <>
        <aside className="top-0 bottom-0 text-white bg-[#1D1D21] fixed h-[100vh] w-[15%]">
            <h1 className=" font-instrumentSerif font-[500]">Vyperium</h1>
            <div className="text-center border-b pb-[1.5rem]">
                <h2 className="px-2 mt-[2.5rem] font-Inter">Welcome to Vyperium</h2>
                <p className="px-2 text-[.8rem] font-Inter pt-[1rem] pb-[1rem]">Connect an Venom wallet to manage your DeFi portfolio</p>
                <Connectwallet />
            </div>
            <nav className=" pt-[2rem]">
                <ul className=" space-y-[1.5rem]">
                    {links}
                </ul>
            </nav>
        </aside>
        <header className="flex justify-between pt-[1rem] border-b border-b-[#808080] pb-3 text-white fixed top-0 left-[22%] right-[7%]">
            <div className=" flex items-center">
                <input 
                    type="text"
                     className="bg-[#29292C] hover:bg-transparent outline-none input transition-[.5s] w-[22rem] pl-[1rem] pr-[2rem] py-1 text-[#808080] font-Inter rounded-[5px]"
                       placeholder="Asset, wallet, domain or identity"
                       />
                <button className=" translate-x-[-120%] bg-[#45464A] p-[5px] h-[80%] rounded-[3px]">
                    <Image src= "/images/search.svg" alt ="Search" height={1} width={15}/>
                </button>
            </div>
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
        </header>
    </>
  )
}

export default AppNav
