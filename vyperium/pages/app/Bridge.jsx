import HeadComp from "@/layout/HeadComp"
import Image from "next/image"

const Bridge = () => {
  return (
    <>
        <HeadComp title= "Vyperium - Bridge" />
        <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem] text-white">
            <h2 className="font-Oswald text-[2rem] font-[600]">Bridge</h2>
            <p className="font-Inter text-[rgb(128,128,128)] text-[.9rem]">Bridge from Venom to other Chains and vice versa</p>
            <div className="relative border-[2px] border-[#1D1D21] mt-[2rem] w-[80%] rounded-[1rem] p-[2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex w-[40%] bg-[#1D1D21] py-[2px] px-[5px] rounded-[.7rem] items-center mb-[1rem] justify-between">
                        <div className="flex items-center">
                            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">
                                <span className="font-poppins font-[300] text-[#808080]">From</span> <br />
                                Venom
                            </h3>
                        </div>
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <button className="border-[#1D1D21] border-2 rounded-[50%] p-[1rem]">
                        <Image src= "/images/arrow-right.svg" alt ="gas" height={1} width={20}/>
                    </button>
                    <div className="flex w-[40%] bg-[#1D1D21] py-[2px] px-[5px] rounded-[.7rem] items-center mb-[1rem] justify-between">
                        <div className="flex items-center">
                            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">
                                <span className="font-poppins font-[300] text-[#808080]">From</span> <br />
                                Venom
                            </h3>
                        </div>
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                </div>
                <div className=" bg-[#1D1D21] rounded-[1rem] p-[1rem]">
                    <p className="font-poppins">Send</p>
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
                <button className="w-full mt-[1rem] bg-[#008000] font-raleway py-[1rem] rounded-[1rem] font-bold">Bridge Asset</button>
            </div>
        </section>
    </>
  )
}

export default Bridge
