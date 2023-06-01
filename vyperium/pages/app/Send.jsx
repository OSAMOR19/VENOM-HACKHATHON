import React,{useState, useEffect} from 'react'
import HeadComp from "@/layout/HeadComp"
import Image from "next/image"
import Button from "../venom-connect/button";

const Send = () => {
    const [addr, setAddr] = useState(null);
    const handleAddrChange = (newAddr) => {
        setAddr(newAddr);  
      };
  return (
    <>
        <HeadComp title= "Vyperium - Send" />
        <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem] text-white">
            <h2 className="font-Oswald text-[2rem] font-[600]">Send</h2>
            <p className="font-Inter text-[rgb(128,128,128)] text-[.9rem]">Send any token on Venom Blockchain to any Venom wallet</p>
            <div className="relative border-[2px] border-[#1D1D21] mt-[2rem] w-[80%] rounded-[1rem] p-[2rem]">
                <ul className="font-poppins font-bold flex justify-around border-b-[1px] border-b-[#808080] pb-[1rem] mb-[1rem]">
                  <li className="transition-[.5s] cursor-pointer text-[#008000] hover:text-[#008000]">Token</li>
                  <li className="transition-[.5s] cursor-pointer hover:text-[#008000]">NFT</li>
                </ul>
                <div className="flex items-center mb-[1rem]">
                    <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                    <h3 className="font-Inter font-bold">Venom</h3>
                    <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                </div>
                <div className=" bg-[#1D1D21] rounded-[1rem] p-[1rem]">
                    <p className="font-poppins">Recipient</p>
                    <div className="flex justify-between">
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="Address, domain or identity" className="bg-transparent outline-none font-[700] w-[32rem] font-Oswald text-[#808080]" />
                        </div>
                        <div className="flex items-center">
                            <Image src="/images/user.svg" className="rounded-[50%] " width={30} height={1}/>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">0x0000...</p>
                </div>
                <div className="bg-[#1D1D21] rounded-[1rem] mt-[4px] p-[1rem]">
                    <p className="font-poppins">Asset</p>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">Token</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[16rem] text-right font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">0</span></p>
                </div>
                {addr == null ? (
                  <div className="w-full mt-[1rem] bg-[#008000] cursor-pointer font-raleway py-[1rem] rounded-[1rem] font-bold flex justify-center items-center" onAddrChange={handleAddrChange} >
                  <Button onAddrChange={handleAddrChange} />
                </div>
                   ):(   
                <button className="w-full mt-[1rem] bg-[#008000] font-raleway py-[1rem] rounded-[1rem] font-bold">Send</button>
            )}
            </div>
        </section>
    </>
  )
}

export default Send
