import HeadComp from "@/layout/HeadComp"
import Image from "next/image"

const Bridge = () => {
  return (
    <>
        <HeadComp title= "Vyperium - Bridge" />
        <section className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[4rem] md:mt-[5rem] text-white">
            <h2 className="font-Oswald w-[90%] text-[2rem] font-[600]">Bridge</h2>
            <p className="font-Inter text-[rgb(128,128,128)] text-[.9rem]">Bridge from Venom to other Chains and vice versa</p>
            <div className="relative border-[2px] border-[#1D1D21] mt-[2rem] mx-auto md:mx-0 w-[95%] md:w-[80%] rounded-[1rem] py-[2rem] px-[1rem]  md:p-[2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex w-[40%] bg-[#1D1D21] py-[2px] px-[5px] rounded-[.7rem] items-center mb-[1rem] justify-between">
                        <div className="flex items-center">
                            <Image alt="venomimg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
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
                            <Image alt="venomimg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">
                                <span className="font-poppins font-[300] text-[#808080]">To</span> <br />
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
                            <Image alt="venomimg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">Select a token</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[5rem] md:w-[16rem] text-right font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">0</span></p>
                </div>
                <div className="bg-[#1D1D21] rounded-[1rem] mt-[4px] p-[1rem]">
                    <p className="font-poppins">Receive</p>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Image alt="venomimg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">Select a token</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[5rem] md:w-[16rem] text-right font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">0</span></p>
                </div>
                <button className="w-full mt-[1rem] bg-[#00800045] font-raleway py-[1rem] rounded-[1rem] font-bold">Coming Soon</button>
            </div>
        </section>
    </>
  )
}

export default Bridge
