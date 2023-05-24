import Image from "next/image"
import Link from "next/link"
import { CSSProperties, useState } from "react";
import { PulseLoader } from "react-spinners";

const BreadCrumb = ({children, includeAccounts, handleInputChange1, getResult, renderOwnerAddresses, renderBalance, balance, textColor, textTColor}) => {
    
    const [loading, setLoading] = useState(false);
    const [Lcolor, setColor] = useState("#008000");

    const override = {
        display: "block",
        margin: "auto",
    };

  return (
    <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem]">
      <div className=" mb-[2rem]">
        <div className="input-container">
            <div 
                className='relative flex items-center'>
            <input
                type="text"
                placeholder="Enter Owner Addresses (comma-separated)"
                value={includeAccounts.join(',')}
                onChange={handleInputChange1}
                onInput={() => setLoading(true) }
                className= "w-[100%] bg-[#29292C] hover:bg-transparent outline-none transition-[.5s] pl-[1rem] pr-[2rem] py-1 text-[#808080] font-Inter rounded-[5px]"
            />
            <button className="right-1 absolute bg-[#45464A] p-[5px] h-[80%] rounded-[3px]">
                <Image src= "/images/search.svg" alt ="Search" height={1} width={15}/>
            </button>
            </div>
            <div className="text-center">
                <PulseLoader
                    color={Lcolor}
                    loading={loading}
                    cssOverride={override}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <div tabIndex={0} className="rounded text-white cursor-pointer w-50" onClick={getResult}>
                    {renderOwnerAddresses}
                    {renderBalance}
                </div>
            </div>
        </div>
      </div>
        
      <div className="flex items-center justify-between text-white">
          <div className=" flex items-center gap-5">
              <button className="font-Inter border-[1px] rounded-[6px] h-[3rem] px-[1rem] border-[#008000]">Add Wallet</button>
              <Image src= "/images/share.svg" alt ="gas" height={1} width={20}/>
              <Image src= "/images/tg.svg" alt ="gas" height={1} width={20}/>
          </div>
          <div className="font-Inter flex gap-5">
                <Image src= "/images/user_img.svg" alt ="user_img" height={1} width={100}/>
            {/**This is the input section */}                
                <div className="">
                    {balance !== null && (
                        <div className="flex items-center">
                        {includeAccounts.map((address) => (
                            <p key={address}>{address.slice(0, 4) + '...' + address.slice(-4)}</p>
                        ))}                     
                        <Image 
                            src= "/images/angle-down.svg" 
                            alt ="svg" height={1} width={30}
                            onClick={getResult}
                            className="cursor-pointer"/>
                        </div>)}
                    <p className="text-[2.6rem] font-poppins font-[600]">${Math.floor(balance / 1000000000)}</p>
                    <p className="text-[.9rem] font-Inter text-[#01A643]">+0% ($0.00)</p>
                </div>
            </div>
        </div>
        <ul className="flex gap-[2rem] border-b-[1px] pb-[5px] font-poppins mt-[1.6rem] mb-[1.4rem] text-white">
        <li style={ { color: textColor }} className="font-bold hover:text-[#008000]">
            <Link href= "/app/Overview">
            Tokens      
            </Link>
        </li>
        <li style={ { color: textTColor }} className="font-bold hover:text-[#008000]">
            <Link href= "/app/History">
            History    
            </Link>
        </li>
        </ul>
        {children}
    </section>
  )
}

export default BreadCrumb
