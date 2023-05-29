import Image from "next/image"

const Swap = () => {
  return (
    <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem] text-white">
        <h2 className="font-Oswald text-[2rem] font-[600]">Swap</h2>
        <p className="font-Inter text-[rgb(128,128,128)] text-[.8rem]">Trade any token, LP share or Vault in a single transaction</p>
        <div className=" border-[2px] border-[#1D1D21] mt-[2rem] rounded-[1rem] p-[2rem]">
            <div className="flex items-center mb-[1rem]">
                <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                <h3 className="font-Inter font-bold">Venom</h3>
                <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
            </div>
            <div className=" bg-[#1D1D21] rounded-[1rem] p-[1rem]">
                <p className="font-Inter">Pay with</p>
                <div className="">
                    <div className="flex items-center">
                        <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                        <h3 className="">Token1</h3>
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <div className="">
                        <input type="text" className=" text-[#000]" />
                    </div>
                </div>
                <p className="">Balance:&nbsp;<span className="">0</span></p>
            </div>
            <div className="">
                <p className="">Receive</p>
                <div className="">
                    <div className="">
                        <Image src="/images/venomimg.jpg" className="rounded-[50%]" width={20} height={1}/> 
                        <h3 className="">Token2</h3>
                        <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                    </div>
                    <div className="">
                        <input type="text" className=" text-[#000]" />
                    </div>
                </div>
                <p className="">Balance:&nbsp;<span className="">0</span></p>
            </div>
            <button className="">Swap</button>
        </div>
    </section>
  )
}

export default Swap
