import Image from "next/image"
import Link from "next/link"
import { CSSProperties, useState, useRef } from "react";
import { PulseLoader } from "react-spinners";

const BreadCrumb = ({children, includeAccounts, clickedIncludeAccounts, clickedBalance, handleInputChange1, topRef,getResult, renderOwnerAddresses, renderBalance, balance, textColor, textTColor, spinnerProp, spinnerSetter, handleAddAddress, addresses, setIncludeAccounts}) => {
    
    const [Lcolor, setColor] = useState("#008000");
    const [isExpanded, setIsExpanded] = useState(false);
    const dropDown = useRef()
    const override = {
        display: "block",
        margin: "auto",
    };
    const toggleDropdown = () => {
        setIsExpanded(!isExpanded)
        dropDown.current.classList.toggle("expanded")
    }

  return (

  //  <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem]" >
  //    <div className=" mb-[2rem]"> 

    <section className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[4rem] md:mt-[5rem]" ref={topRef}>
      <div className=" mb-[2rem]">

        <div className="input-container">
            <div 
                className='relative flex items-center'>
            <input
                type="text"
                placeholder="Enter Owner Addresses (comma-separated)"
                value={includeAccounts.join(',')}
                onChange={handleInputChange1}
                onInput={spinnerSetter}
                className= "w-[100%] bg-[#29292C] hover:bg-transparent outline-none transition-[.5s] pl-[1rem] pr-[2rem] py-1 text-[#808080] font-Inter rounded-[5px]"
            />
            <button className="right-1 absolute bg-[#45464A] p-[5px] h-[80%] rounded-[3px]">
                <Image src= "/images/search.svg" alt ="Search" height={1} width={15}/>
            </button>
            </div>
            <div className="md:text-center">
                <PulseLoader
                    color={Lcolor}
                    loading={spinnerProp}
                    cssOverride={override}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <div tabIndex={0} className="rounded text-white cursor-pointer w-50" onClick={getResult}>
                    <div className="pt-[1rem] md:pt-0 overflow-hidden">
                    {renderOwnerAddresses}
                    <div className="text-green-800 font-bold"> 
                    {renderBalance}
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
        
      <div className="flex flex-col-reverse md:flex-row md:items-center pl-[.5rem] md:pl-0 gap-4 md:gap-0 justify-between text-white">
        {/*To be styled */}
          <div className=" flex items-center gap-5">
            <button 
                className="font-Inter border-[1px] rounded-[6px] h-[3rem] px-[1rem] border-[#008000]"
                onClick={handleAddAddress}>Add Wallet
            </button>
            <div ref={dropDown} className="relative font-Inter border-[1px] rounded-[6px] h-fit px-[1rem] border-[#008000]">
                <h3>Stored Addresses:</h3>
                <div onClick={toggleDropdown} className=" cursor-pointer">
                    {isExpanded ? '🔺' : '🔻'}Click to {isExpanded ? 'contract' : 'expand'}
                </div>
                <ul className="absolute transition-[.5s] border p-2 rounded-[5px] border-t-0 bg-[#0C0C0C] left-[-10px] scale-y-[0] translate-y-[-100px]">
                    {addresses.length == 0 && <li className=" pt-2 text-center">No Address Added yet..</li>}
                    {addresses.map((address, index) => (
                        <li
                            key={index}
                            onClick={() => setIncludeAccounts([address])}
                            style={{ cursor: 'pointer' }}
                            title={address}
                            className=" pt-2 border-b"
                            >
                            {`${address.slice(0, 7)}....${address.slice(40, -20)}...${address.slice(-4)}`}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
          <div className="font-Inter flex gap-5">
                <Image src= "/images/user_img.svg" alt ="user_img" height={1} width={100}/>
            {/**This is the input section */}                
                <div className="">
                    
                        <div className="flex items-center">
                        <div>
                        {clickedIncludeAccounts && clickedIncludeAccounts.map((address) => (
                         <p key={address}>{address.slice(0, 4) + '...' + address.slice(-4)}</p>
                        ))}

                        </div>
          
                        <Image 
                            src= "/images/angle-down.svg" 
                            alt ="svg" height={1} width={30}
                            onClick={getResult}
                            className="cursor-pointer"/>
                        </div>
                    <p className="text-[2.6rem] font-poppins font-[600]">${Math.floor(clickedBalance  / 1000000000)}</p>
                    <p className="text-[.9rem] font-Inter text-[#01A643]">+0% ($0.00)</p>
                </div>
            </div>
        </div>
        <ul className="flex mx-1 gap-[2rem] border-b-[1px] pb-[5px] font-poppins mt-[1.6rem] mb-[1.4rem] text-white">
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
