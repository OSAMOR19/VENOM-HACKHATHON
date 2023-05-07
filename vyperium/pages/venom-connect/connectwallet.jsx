import { useState, useEffect } from 'react';
import { initVenomConnect } from './configure';



export default function Connectwallet() {
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
const [venomProvider, setVenomProvider] = useState();
const [address, setAddress] = useState();
const getAddress = async (provider) => {
  const providerState = await provider?.getProviderState?.();
  return providerState?.permissions.accountInteraction?.address.toString();
};
const checkAuth = async (_venomConnect) => {
  const auth = await _venomConnect?.checkAuth();
  if (auth) await getAddress(_venomConnect);
};

const onConnect = async (provider) => {
  setVenomProvider(provider);
  await onProviderReady(provider);
};

const onDisconnect = async () => {
  venomProvider?.disconnect();
  setAddress(undefined);
};

const onProviderReady = async (provider) => {
  const venomWalletAddress = provider ? await getAddress(provider) : undefined;
  setAddress(venomWalletAddress);
};
useEffect(() => {
  // connect event handler
  const off = venomConnect?.on('connect', onConnect);
  if (venomConnect) {
    checkAuth(venomConnect);
  }
  // just an empty callback, cuz we don't need it
  return () => {
    off?.();
  };
}, [venomConnect]);



  return (
    <>
     <div>
     {address ? (
    <button onClick={onDisconnect} className="bg-[#0052FF] px-4 py-2 rounded-[5px]">
      {`${address.slice(0, 6)}...${address.slice(-4)}`}
    </button>
    ) : (
      <button onClick={login} className="font-raleway bg-[#0052FF] px-4 py-2 rounded-[5px]">
        Connect Wallet
      </button>
    )}
    </div>
    </>  
  )
}
