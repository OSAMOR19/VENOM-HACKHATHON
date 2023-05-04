import HeadComp from "@/layout/HeadComp";
import Index from "./components/Index";
import { useState, useEffect } from 'react';
import { initVenomConnect } from './venom-connect/configure';



export default function Home() {
  const [venomConnect, setVenomConnect] = useState();
const init = async () => {
  const _venomConnect = await initVenomConnect();
  setVenomConnect(_venomConnect);
};
useEffect(() => {
  init();
}, []);

const login = async () => {
  if (!venomConnect) return;
  await venomConnect.connect();
};
  return (
    <>
    <div venomConnect={venomConnect}>
    <HeadComp title="Vyperium - Home" />
    <Index />
    <button onClick={login} className=" white bg-green-500">Connect Wallet</button>
    </div>
    </>
  )
}
