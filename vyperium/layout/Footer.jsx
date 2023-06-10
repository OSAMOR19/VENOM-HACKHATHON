import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-wp mt-[3rem] pt-[6rem] pb-[4rem] text-white">
      <div className="w-[80%] mx-auto">
        <div className=" flex justify-evenly items-center pb-[3rem] border-b-[1px] border-[#808080]">
          <div className=" w-[18%] mr-[2rem]">
            <Image src="/images/vyperiumlogo.jpeg" width={47} height={1} /> 
            <p className=" font-openSans pt-[1rem]"> </p>
          </div>
          <div className="w-full  justify-between items-center md:flex-row flex-col pt-6  border-t-[#3F3E45] font-bold">
            <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
                Venom
            </p>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
