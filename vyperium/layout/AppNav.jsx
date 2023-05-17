import Connectwallet from "@/pages/venom-connect/connectwallet"
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
			<Link className="pl-[1rem] flex gap-3" href={link.path}>
                <Image src = {link.iconSrc} alt = "appIcon" height ={1} width = {20} />
                {link.title}
            </Link>
		</li>
	));
  return (
    <>
        <aside className=" text-white bg-[#1D1D21] fixed h-[100vh] w-[15%]">
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
    </>
  )
}

export default AppNav
