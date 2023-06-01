
import Button from "@/pages/venom-connect/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";




const AppNav = () => {
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

 
  return (
    <>
        <aside className="top-0 bottom-0 text-white bg-[#1D1D21] fixed h-[100vh] w-[15%]">
            <div className="text-center border-b pb-[1.5rem]">
                <h2 className="px-2 mt-[2.5rem] font-Inter">Welcome to Vyperium</h2>
                <p className="px-2 text-[.8rem] font-Inter pt-[1rem] pb-[1rem]">Connect an Venom wallet to manage your DeFi portfolio</p>
                <Button />
            </div>
            <nav className=" pt-[2rem]">
                <ul className=" space-y-1">
                    {links}
                </ul>
            </nav>
        </aside>
        <header className="flex bg-[#0C0C0C] justify-between pt-[1rem] border-b border-b-[#808080] pb-3 text-white fixed top-0 left-[22%] right-[7%]">
            <div className=" flex items-center">
                logo&nbsp;
                <h1 className=" font-instrumentSerif font-[500]">Vyperium</h1>
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
