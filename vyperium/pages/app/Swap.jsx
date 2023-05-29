import HeadComp from "@/layout/HeadComp"
import Image from "next/image"

const Swap = () => {
  return (
    <>
        <HeadComp title= "Vyperium - Swap" />
        <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem] text-white">
            <h2 className="font-Oswald text-[2rem] font-[600]">Swap</h2>
            <p className="font-Inter text-[rgb(128,128,128)] text-[.9rem]">Trade any token, LP share or Vault in a single transaction</p>
            <div className="relative border-[2px] border-[#1D1D21] mt-[2rem] w-[80%] rounded-[1rem] p-[2rem]">
                <div className="flex items-center mb-[1rem]">
                    <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                    <h3 className="font-Inter font-bold">Venom</h3>
                    <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                </div>
                <div className=" bg-[#1D1D21] rounded-[1rem] p-[1rem]">
                    <p className="font-poppins">Pay with</p>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">TOKEN1</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[2rem] font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">0</span></p>
                </div>
                <div className="flex justify-center translate-y-[-50%] left-0 right-0 absolute">
                    <button className="bg-[#1D1D21] rounded-[50%] border-t-[#0C0C0C] border-r-[#0C0C0C] border-t-[3px] border-r-[3px] rotate-[-45deg] p-1">
                        <Image src= "/images/up-and-down-arrows.svg" alt ="swap" height={1} width={30} />
                    </button>
                </div>
                <div className="bg-[#1D1D21] rounded-[1rem] mt-[4px] p-[1rem]">
                    <p className="font-poppins">Receive</p>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">Token2</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[2rem] font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">0</span></p>
                </div>
                <button className="w-full mt-[1rem] bg-[#008000] font-raleway py-[1rem] rounded-[1rem]">Swap</button>
            </div>
        </section>
    </>
  )
}

export default Swap
