import Image from "next/image"


const Navigation = () => {
  return (
    <header className="pt-[2rem] flex items-center w-[80%] justify-between text-white mx-auto">
      <div className="flex cursor-pointer font-instrumentSerif text-[1.7rem] items-center">
        <Image src="/images/vyperium-logo.svg" width={47} height={1} />
        Vyperium
      </div>
      <nav className=" font-raleway flex w-[60%] items-center">
        <ul className=" flex-1 justify-evenly flex">
          <li>Careers</li>
          <li>Blog</li>
          <li>Help Center</li>
          <li>Community</li>
        </ul>
        <button className=" bg-[#0052FF] px-4 py-2 rounded-[5px]">Connect Wallet</button>
      </nav>
    </header>
  )
}

export default Navigation
