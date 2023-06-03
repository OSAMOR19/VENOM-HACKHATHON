import HeadComp from "@/layout/HeadComp"
import Image from "next/image"
import Button from '../venom-connect/button';
import { useState, useEffect } from "react";
import tokenList from './constant/tokenList.json';
import axios from 'axios';

const Swap = () => {
    const [addr, setAddr] = useState();
    const [rootAddress, setRootAddress] = useState('');
    const [symbol, setSymbol] = useState('');
    const [decimals, setDecimals] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [smallModal, setSmallModal] = useState(false)

    const openPopup = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const openModal = () =>{
      setSmallModal(true);
    }

    const closeModal = () =>{
      setSmallModal(false);
    }

    const handleAddrChange = (newAddr) => {
        setAddr(newAddr);
      };

      useEffect(() => {
        if (rootAddress) {
          fetchTokenData();
        }
      }, [rootAddress]);
    
      const fetchTokenData = async () => {
        try {
          const response = await axios.post('/api/token', { rootAddress });
          const { symbol, decimals } = response.data;
          setSymbol(symbol);
          setDecimals(decimals);
        } catch (error) {
          console.error(error);
          setSymbol('No Result Found')
          setDecimals([])
        }
      };

      const handleInputChange = (event) => {
        setRootAddress(event.target.value);
      };

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
                        <div className="flex items-center" onClick={openPopup}>
                            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">TOKEN1</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[16rem] text-right font-Oswald text-[#808080]" />
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
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[16rem] text-right font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">0</span></p>
                </div>
                {addr == null ? (
            <div className="w-full mt-[1rem] bg-[#008000] cursor-pointer font-raleway py-[1rem] rounded-[1rem] font-bold flex justify-center items-center">
              <Button onAddrChange={handleAddrChange} />
            </div>
          ) : (
            <button className="w-full mt-[1rem] bg-[#008000] font-raleway py-[1rem] rounded-[1rem] font-bold" >Swap</button>
          )}
            </div>
          

          {/* BIG MODAL */}
          {/* BIG MODAL */}
          {/* BIG MODAL */}

        {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-neutral-900 p-4 rounded max-h-[60vh] overflow-y-auto scrollbar">
            <div className="flex justify-between px-4 py-4">
                <div className="font-bold">Select Token</div>
                <div><button
              onClick={closePopup}
             
              className="text-white hover:text-red-700 text-white font-bold text-2xl "
            >
              X
            </button></div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Input Address  0:343....."
                className="bg-transparent outline-none font-bold w-80 text-gray-700"
              />
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded " onClick={openModal}>
                Import Token
              </button>
            </div>
            <ul className="px-4">
              {tokenList.map((token) => (
                <li
                  key={token.ticker}
                  className="shadow-md py-2 cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold">{token.name}</span>
                      <br />
                      {token.ticker}
                    </div>
                    <div>balance</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SMALL MODAL */}
      {/* SMALL MODAL */}
      {/* SMALL MODAL */}
      
      {smallModal&&(     
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" >
        <div className='bg-neutral-800 rounded-md p-4 '>
          <div className="flex justify-between p-2">
          <p>Find the token you want to Swap</p>
          <div><button
                    onClick={closeModal}
                    className="text-white hover:text-red-700 text-white font-bold text-2xl "
                  >
                    X
                  </button></div>
          </div>     
          <input type="text" value={rootAddress} onChange={handleInputChange}
          placeholder="Input Address 0:3456....."
          className="bg-transparent outline-none font-[700] w-[25rem] border border-green-500 rounded font-Oswald text-[#808080]"/>
          <div className="flex justify-between p-4">
            <div><span className="font-bold text-l">Title:{symbol}<br/>Decimal:{decimals}</span></div>
          <div className="font-bold cursor-pointer border hover:border-green-500 rounded px-4 bg-neutral-500">
          import
          </div>
          </div>
          </div>
          </div>
          )}
        </section>
    </>
  )
}

export default Swap
