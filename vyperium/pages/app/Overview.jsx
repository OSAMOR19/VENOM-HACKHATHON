import Image from "next/image"

const Overview = () => {
  return (
    <section className="overflow-y-auto ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem]">
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
    </section>
  )
}

export default Overview
