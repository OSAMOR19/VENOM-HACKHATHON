import Image from "next/image"

const Overview = () => {
  return (
    <section className="overflow-y-auto overflow-x-hidden ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem]">
        <div className="flex items-center justify-between text-white">
            <div className=" flex items-center gap-5">
                <button className="font-Inter border-[1px] rounded-[6px] h-[3rem] px-[1rem] border-[#008000]">Add Wallet</button>
                <Image src= "/images/share.svg" alt ="gas" height={1} width={20}/>
                <Image src= "/images/tg.svg" alt ="gas" height={1} width={20}/>
            </div>
            <div className="font-Inter flex gap-5">
                <Image src= "/images/user_img.svg" alt ="gas" height={1} width={100}/>
                <div className="">
                    <div className="flex items-center">
                        <span>0xd869…aafb</span>
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <p className="text-[2.6rem] font-[600]">$0.00 ...</p>
                    <p className="text-[.9rem] text-[#01A643]">+0% ($0.00)</p>
                </div>
            </div>
        </div>
        <div className="bg-[#1D1D21] font-Inter py-[1rem] mt-[1rem] px-[1rem] text-white flex justify-between items-center">
            <ul className=" flex gap-5">
                <li className="border-b text-[#008000] border-b-[#008000]">Tokens</li>
                <li>NFTs</li>
                <li>History</li>
            </ul>
            <div className="flex items-center">
                <Image src= "/images/eye.svg" className=" mr-[.6rem]" alt ="gas" height={1} width={20}/>
                All Networks
                <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
            </div>
        </div>
        <section className="flex font-Inter gap-5 text-white mt-[1rem]">
            <div className="w-[60%]">
                <h3 className="text-[1.5rem] mb-[1rem]">Performance</h3>
                <div className="border-[1px] h-[17rem] rounded-[10px]">
                    <span className="pl-[1rem] text-[2rem]">...</span>
                    <div className="text-center">
                        <p className=" font-[600] text-[1.4rem] mt-[1rem]">Your wallet is empty</p>
                        <p className=" text-[#808080] mt-[.7rem]">Deposit funds to start using Vyperium</p>
                        {/* might not need this CTA though */}
                        <button className="bg-[#008000] px-[2rem] py-2 rounded-[6px] mt-[1rem]">Deposit Funds</button>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-[1.3rem] mb-[1rem]">History</h3>
                <div className="border-[1px] h-[17rem] flex items-center justify-center rounded-[10px]">
                    <p className=" text-center text-[1.3rem]">
                    😱 <br />
                    No transactions yet
                    </p>
                </div>
            </div>
        </section>
        <section>
            <div className="flex items-center justify-between mt-[1rem] text-white font-Inter">
                <h3 className=" text-[1.2rem]">Assets</h3>
                <div className="flex items-center">
                    <button className="border-[1px] mr-[1.25rem] border-[#008000] p-2 rounded-[4px]">
                        <Image src= "/images/vctr.svg" alt ="gas" height={1} width={16}/>
                    </button>
                    <button className="border-[1px] border-[#808080] text-[.9rem] rounded-[4px] px-2 py-[5px]">By Platform</button>
                    <button className="text-[.9rem] pl-[1rem] bg-[#1D1D21] py-[7px] rounded-r-[4px] pr-2 mr-[1.25rem]">By Position</button>
                    <button className="border-[1px] border-[#008000] px-2 pb-2 rounded-[4px]">...</button>
                </div>
            </div>
            <div className="mt-[1rem] text-center text-white font-Inter text-[1.6rem] h-[10rem] border-[1px] rounded-[10px] flex items-center justify-center">
            😱 <br />
            No Assets yet!
            </div>
        </section>
    </section>
  )
}

export default Overview
