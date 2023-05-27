import Button from "../venom-connect/button"
import { useData } from '@/context/DataContext';
const { default: HeadComp } = require("@/layout/HeadComp")
import { useRouter } from 'next/router';
import { useEffect } from "react";


const ConnectWallet = () => {
  const { setCnnctdAddr } = useData();
  const { connectedAddr } = useData();
  const { isConnected } = useData()
  const router = useRouter();

  const handleAddrChange = (newAddr) => {
    setCnnctdAddr([newAddr]); 
  };
  
  if (isConnected) {
    router.push(`/app/${connectedAddr[0]}/Overview1`);
  }

  return (
    <>
        <HeadComp title= "Vyperium - Connect Wallet"/>
        <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[7rem] text-white font-Oswald text-[2rem] text-center">
            <h2 className="mb-[3rem]">Connect Your Wallet to start using Vyperium</h2>
            <Button onAddrChange={handleAddrChange}/>
        </section>
    </>

  )
}

export default ConnectWallet
