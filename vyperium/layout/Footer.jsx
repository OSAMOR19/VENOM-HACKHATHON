import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-wp mt-[3rem] pt-[6rem] pb-[4rem] text-white">
      <div className="w-[80%] mx-auto">
        <div className=" flex justify-evenly items-center pb-[3rem] border-b-[1px] border-[#808080]">
          <div className=" w-[18%] mr-[2rem]">
            <Image src="/images/vyperium-logo.svg" width={47} height={1} /> 
            <p className=" font-openSans pt-[1rem]"> Lorem Ipsum is simply dummy text of the printing and typesetting industry standard dummy</p>
          </div>
          <div className="w-[18%]">
            <h3 className="font-poppins font-[700] pb-[1rem]">Product</h3>
            <ul className="text-[#808080] font-raleway list-none">
              <li>Overview</li>
              <li>Download</li>
              <li>Security</li>
              <li>Support</li>
              <li>Feature Requests</li>
            </ul>
          </div>
          <div className="w-[18%]">
            <h3 className="font-poppins font-[700] pb-[1rem]">Company</h3>
            <ul className="text-[#808080] font-raleway list-none">
              <li>About</li>
              <li>Blog</li>
              <li>Docs</li>
              <li>Taxes</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="w-[18%]">
            <h3 className="font-poppins font-[700] pb-[1rem]">Product</h3>
            <ul className="text-[#808080] font-raleway list-none">
              <li>Overview</li>
              <li>Download</li>
              <li>Security</li>
              <li>Support</li>
              <li>Feature Requests</li>
            </ul>
          </div>
          <div className="w-[18%]">
            <h3 className="font-poppins font-[700] pb-[1rem]">Product</h3>
            <ul className="text-[#808080] font-raleway list-none">
              <li>Overview</li>
              <li>Download</li>
              <li>Security</li>
              <li>Support</li>
              <li>Feature Requests</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
