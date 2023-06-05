import HeadComp from "@/layout/HeadComp"
import { useState, useEffect } from "react";
import { Token_Root } from "./constant/abi/TokenRootAbi";
import { Token_Wallet } from "./constant/abi/TokenWalletAbi";
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { VenomConnect } from 'venom-connect';



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
                      id: 1010,
                      group: 'venom_testnet',
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


{/*const Explore = () => {
  return (
    <>
        <HeadComp title="Vyperium - Explore" />
    </>
  )
}

export default Explore*/}

function Explore() {
  
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
    setPubkey(publicKey);
    setIsConnected(true);
  };
  // This handler will be called after venomConnect.disconnect() action
  // By click logout. We need to reset address and balance.
  const onDisconnect = async () => {
    await provider?.disconnect();
    setAddr(undefined);
    setPubkey(undefined);
    setIsConnected(false);
  };

  const [balance, setBalance] = useState()
  let tokenWalletAddress;

  const setupTokenWalletAddress = async() => {
    try{
      const standalone = await VC?.getStandalone('venomwallet');

      const contractAddress = new Address('0:05ca3fca03a79f8fea747580c1c5a941a456687eb2eab020889285b289b1c6a2')

      const contract= new standalone.Contract(Token_Root, contractAddress);

      const tokenWallet = ( await contract.methods
        
        .walletOf({
          answerId: 0,
          walletOwner: addr.toString(),
        } )
        .call()) 
        if (!tokenWallet) return undefined;
        tokenWalletAddress= tokenWallet.value0._address;
        return tokenWalletAddress;
    }
    catch (e){
      console.error(e)
    }
    return undefined;
  }

  const getBalance = async(addr) => {
    if(!addr) return;
    const standalone = await VC?.getStandalone('venomwallet');

    if(standalone) {
      if(!tokenWalletAddress){
        await setupTokenWalletAddress(standalone, addr);
      }

      if (!provider || !tokenWalletAddress ) return;

      try{
        const contractAddress = new Address(tokenWalletAddress);
        const contract = new standalone.Contract(Token_Wallet, contractAddress);

        const contractState = await provider.rawApi.getFullContractState({address: tokenWalletAddress});
        if (contractState.state){

          const result = await contract.methods.balance({ answerId: 0}).call();
          const  tokenBalance = result.value0;
          setBalance(tokenBalance);
        }
        else {
          setBalance('0');
        }
      }
        catch (e) {
          console.error(e);
        }

      }else{
        alert('Standalone is not available now');
      }
    }
  
    useEffect(() => {
      if(addr) getBalance(addr)
    }, [addr])



return(
  <div className="flex justify-center items-center h-screen">
  {addr ? (
    <div>
    <div className="text-white">
    {balance}</div>
    <button onClick={onDisconnect} className="bg-[#008000] px-4 py-2 rounded-[5px]">
      {`${addr.slice(0, 6)}...${addr.slice(-4)}`}
    </button></div>
  ) : (
    <button onClick={login} className="font-raleway bg-[#008000] px-4 py-2 rounded-[5px]">
      Connect Wallet
    </button>
  )}
</div>

  );
}

export default Explore;
