import React, { useEffect, useState } from 'react';

import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient, Address, Contract } from 'everscale-inpage-provider';


const initVenomConnect = async () => {
  return new VenomConnect({
    theme: 'dark',
    checkNetworkId: 1002,
    checkNetworkName: "Venom Devnet",
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            package: ProviderRpcClient,
            packageOptions: {
              fallback: VenomConnect.getPromise('venomwallet', 'extension') || (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
                fallback: () =>
                  EverscaleStandaloneClient.create({
                    connection: {
                      id: 1002,
                      group: 'venom_devnet',
                      type: 'jrpc',
                      data: {
                        endpoint: 'https://jrpc-devnet.venom.foundation/rpc',
                      },
                    },
                  }),
                forceUseFallback: true,
              },
            id: 'extension',
            type: 'extension',
          },
        ]
      },
    },
  });
};

const SAMPLE_ADDR = new Address("");

function Button( { onAddrChange } ) {
  const [VC, setVC] = useState();
  useEffect(() => {
    (async () => {
      const _vc = await initVenomConnect();
      setVC(_vc);
    })();
  }, []);

  useEffect(() => {
    // connect event handler
    const off = VC?.on('connect', onConnect);
    if (VC)
      (async () => await VC.checkAuth())();

    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [VC]);

  const login = async() => {
    if (!VC) return;
    await VC.connect();
  }

  const [addr, setAddr] = useState();
  const [pubkey, setPubkey] = useState();
  const [provider, setProvider] = useState();
  const [isConnected, setIsConnected] = useState();
  // This method allows us to gen a wallet address from inpage provider
  const getAddress = async (provider) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };
  const getPubkey = async (provider) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.publicKey;
  };

  // This handler will be called after venomConnect.login() action
  // connect method returns provider to interact with wallet, so we just store it in state
  const onConnect = async (provider) => {
    setProvider(provider);
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    const publicKey = provider ? await getPubkey(provider) : undefined;
    setAddr(venomWalletAddress);
    if (typeof onAddrChange === 'function') {
      onAddrChange(venomWalletAddress);
    }
    setPubkey(publicKey);
    setIsConnected(true);
  };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    await provider?.disconnect();
    setAddr(undefined);
    setPubkey(undefined);
    if (typeof onAddrChange === 'function') {
      onAddrChange(venomWalletAddress);
    }
    setIsConnected(false);
  };

  

  return (
    
    <div>
    {addr ? (
   <button onClick={onDisconnect} className="bg-[#008000] px-4 py-2 rounded-[5px]">
     {`${addr.slice(0, 6)}...${addr.slice(-4)}`}
   </button>
   ) : (
     <button onClick={login} className="font-raleway bg-[#008000] px-4 py-2 rounded-[5px]">
       Connect Wallet
     </button>
   )}
   
   </div>
    
  );
}

export default Button;