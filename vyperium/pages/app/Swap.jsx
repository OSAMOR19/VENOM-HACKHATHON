/* eslint-disable react-hooks/exhaustive-deps */
import HeadComp from "@/layout/HeadComp"
import Image from "next/image"
import Button from '../venom-connect/button';
import { useState, useEffect, useRef } from "react";
import tokenList from '@/constant/tokenList.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import { initVenomConnect } from "@/wallet-configure/configure";
import { Token_Root } from "@/constant/abi/TokenRootAbi";
import { Token_Wallet } from "@/constant/abi/TokenWalletAbi";
import { ProviderRpcClient, Address, Contract } from 'everscale-inpage-provider';
import { useData } from "@/context/DataContext";




const Swap = () => {
  const {setIsOnApp} = useData()
  setIsOnApp(false)

    const btnRef = useRef()
    const [addr, setAddr] = useState();
    const [rootAddress, setRootAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingpairs, setIsLoadingpairs] = useState(false);
    const [response, setResponse] = useState(null);
    const [symbol, setSymbol] = useState('');
    const [decimals, setDecimals] = useState('');
    const [input1, setInput1]= useState('');
    const [tokenOne, setTokenOne] = useState('VENOM');
    const [tokenOneAddr, setTokenOneAddr] = useState('');
    const [tokenTwoAddr, setTokenTwoAddr] = useState('');
    const [tokenOneDecimal, setTokenOneDecimal] = useState('0');
    const [tokenTwoDecimal, setTokenTwoDecimal] = useState('0');
    const [tokenTwo, setTokenTwo] = useState('SELECT TOKEN')
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentPopup, setCurrentPopup] = useState(null);
    const [smallModal, setSmallModal] = useState(false)
    const [savedTokens, setSavedTokens] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [tokenOneCurrency, setTokenOneCurrency] = useState('');
    const [tokenTwoCurrency, setTokenTwoCurrency] = useState('');
    const [importClicked, setImportClicked] = useState(false);
    const [fetchError, setFetchError] = useState(false);

  

    useEffect(() => {
      // Fetch the saved tokens from local storage
      const savedTokensData = Cookies.get('tokens');
      if (savedTokensData) {
        setSavedTokens(JSON.parse(savedTokensData));
      }
    }, []);
      

      const openPopup = (buttonIndex) => {
        setCurrentPopup(buttonIndex);
        setIsPopupVisible(true);
        const savedTokensData = Cookies.get('tokens');
        if (savedTokensData) {
          const parsedTokens = JSON.parse(savedTokensData);
          setSavedTokens(parsedTokens);
        }
      };


    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const openModal = () =>{
      setSmallModal(true);
    }

    const closeModal = () =>{
      setSmallModal(false);
      setInput1('');
      setDecimals('');
      setRootAddress('');
      setSymbol('');
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
        setIsLoading(true);
        try {
          const response = await axios.post('/api/token', { rootAddress });
          const { symbol, decimals } = response.data;
          setSymbol(symbol);
          setDecimals(decimals);

        } catch (error) {
          console.error(error);
          setSymbol('No Result Found')
          setDecimals([])
          setFetchError(true); 
        }

        setIsLoading(false);
      };

      const handleInputChange = (event) => {
        setRootAddress(event.target.value);
      };

      const handeleInput1Change = (event) => {
        setInput1(event.target.value);
        setSmallModal(true);
       
      }

      useEffect(() => {
        fetchData();
      }, [tokenOneAddr, tokenTwoAddr]);
    
      const fetchData = async () => {
        try {
          setIsLoadingpairs(true);
    
          const response = await axios.post('/api/swap/pair', {
            currencyAddresses: [tokenOneAddr, tokenTwoAddr],
            limit: 100,
            offset: 0,
            ordering: 'tvlascending'
          });
    
          setResponse(response.data.pairs);
          setIsLoadingpairs(false);
        } catch (error) {
          console.error('Error:', error);
          setIsLoadingpairs(false);
        }
      };
    
      const renderButtonContent = () => {
        if (isLoadingpairs) {

          return <div className="flex justify-center"><div className="  animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-neutral-200"></div></div>;
        } else if (response && response.length > 0) {
          return 'Swap';
        } else {
          return 'Not Enough Liquidity';
        }
      };

  
      const handleImport = () => {
        
        const newToken = {
          rootAddress,
          symbol,
          decimals
        };
    
        const updatedTokens = [...savedTokens, newToken];
        Cookies.set('tokens', JSON.stringify(updatedTokens), { expires: 14 });
    
        // Update the state
        setSavedTokens(updatedTokens);
        setImportClicked(true);
        setSmallModal(false);
        setInput1('')
        setDecimals('')
        setRootAddress('')
        setSymbol('')
      
      };

      const handleCancel = () => {
        // Clear the saved tokens from local storage
        Cookies.remove('tokens');
    
        // Update the state
        setSavedTokens([]);
        setImportClicked(false);
      };

        const handleExchange = () =>{
          setTokenOneDecimal(tokenTwoDecimal);
          setTokenTwoDecimal(tokenOneDecimal);
          setTokenOne(tokenTwo);
          setTokenTwo(tokenOne);
          setTokenOneAddr(tokenTwoAddr);
          setTokenTwoAddr(tokenOneAddr);
          btnRef.current.classList.toggle("rotate-[135deg]")
        }

        const handleItemClick = (name, address,decimal) => {
          if (currentPopup === 1) {
            setTokenOne(name);
            setTokenOneAddr(address);
            setTokenOneDecimal(decimal)
          } else if (currentPopup === 2) {
            setTokenTwo(name);
            setTokenTwoAddr(address);
            setTokenTwoDecimal(decimal)
          }
          setIsPopupVisible(false);
        };
        
        const handleSavedData = (symbol, decimals, rootAddress) =>{
          if (currentPopup === 1) {
            setTokenOne(symbol);
            setTokenOneAddr(rootAddress);
            setTokenOneDecimal(decimals)
          } else if (currentPopup === 2) {
            setTokenTwo(symbol);
            setTokenTwoAddr(rootAddress);
            setTokenTwoDecimal(decimals)
          }
          setIsPopupVisible(false);
        }
////////////////////////////////////////////////////////////////////////
//                 /         /                                         //
//  ///////   ///////  ///////   ////////   ///////  ///////  ///////  //
//    /     /         /     /  /            /     /  /            /   //
//    /     ///////   /     /   ///////     /     /  ///////      /    //
//   /           /   /     /         /     /     /  /            /     //
//  /     ///////   ///////   ///////     ///////  ///////  ///////    //
//                 /         /                                         //
////////////////////////////////////////////////////////////////////////



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


  const [balance1, setBalance1] = useState('');
  
  
  let tokenWalletAddress;

  const setupTokenWalletAddress = async( ) => {
    try{
      const standalone = await VC?.getStandalone('venomwallet');

      const contractAddress = new Address(tokenOneAddr)

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
          setBalance1(tokenBalance);
        }
        else {
          setBalance1('0');
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
    }, [addr,tokenOneAddr])

    
/// REVISIT////

const [balance2, setBalance2] = useState('')
  
let tokenWalletAddress2;

const setupTokenWalletAddress2 = async( ) => {
  try{
    const standalone = await VC?.getStandalone('venomwallet');

    const contractAddress = new Address(tokenTwoAddr)

    const contract= new standalone.Contract(Token_Root, contractAddress);

    const tokenWallet = ( await contract.methods
      
      .walletOf({
        answerId: 0,
        walletOwner: addr.toString(),
      } )
      .call()) 
      if (!tokenWallet) return undefined;
      tokenWalletAddress2= tokenWallet.value0._address;
      return tokenWalletAddress2;
  }
  catch (e){
    console.error(e)
  }
  return undefined;
}

const getBalance2 = async(addr) => {
  if(!addr) return;
  const standalone = await VC?.getStandalone('venomwallet');

  if(standalone) {
    if(!tokenWalletAddress){
      await setupTokenWalletAddress2(standalone, addr);
    }

    if (!provider || !tokenWalletAddress2 ) return;

    try{
      const contractAddress = new Address(tokenWalletAddress2);
      const contract = new standalone.Contract(Token_Wallet, contractAddress);

      const contractState = await provider.rawApi.getFullContractState({address: tokenWalletAddress2});
      if (contractState.state){

        const result = await contract.methods.balance({ answerId: 0}).call();
        const  tokenBalance2 = result.value0;
        setBalance2(tokenBalance2);
      }
      else {
        setBalance2('0');
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
    if(addr) getBalance2(addr)
  }, [addr,tokenTwoAddr])

  const tokenOneBalance= (balance1  / Math.pow(10, tokenOneDecimal));
  const tokenTwoBalance = balance2 / Math.pow(10, tokenTwoDecimal);

  
////////////////////////////////////////////////////////////////////////
//                 /         /                                         //
//  ///////   ///////  ///////   ////////   ///////  ///////  ///////  //
//    /     /         /     /  /            /     /  /            /   //
//    /     ///////   /     /   ///////     /     /  ///////      /    //
//   /           /   /     /         /     /     /  /            /     //
//  /     ///////   ///////   ///////     ///////  ///////  ///////    //
//                 /         /                                         //
////////////////////////////////////////////////////////////////////////


  return (
    <>
        <HeadComp title= "Vyperium - Swap" />
        <section className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[4rem] md:mt-[5rem] text-white">
            <h2 className="font-Oswald text-[2rem] font-[600]">Swap</h2>
            <p className="font-Inter w-[90%] text-[rgb(128,128,128)] text-[.9rem]">Trade any token, LP share or Vault in a single transaction</p>
            <div className="relative border-[2px] border-[#1D1D21] mt-[2rem] mx-auto md:mx-0 w-[95%] md:w-[80%] rounded-[1rem] py-[2rem] px-[1rem]  md:p-[2rem]">
                <div className="flex items-center mb-[1rem]">
                    <Image alt="venomImg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                    <h3 className="font-Inter font-bold">Venom</h3>
                </div>
                <div className=" bg-[#1D1D21] rounded-[1rem] p-[1rem]"  >
                    <p className="font-poppins">Pay with</p>
                    <div className="flex justify-between" >
                        <div className="flex cursor-pointer items-center" onClick={() => openPopup(1)} >
                            <Image alt="venomImg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">{tokenOne}</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas" height={1} width={30}/>
                        </div>
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[5rem] md:w-[16rem] text-right font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">{tokenOneBalance}</span></p>
                </div>
                <div className="flex justify-center translate-y-[-50%] left-0 right-0 absolute">
                    <button onClick={handleExchange} ref={btnRef} className="bg-[#1D1D21] transition-[1s] rounded-[50%] border-t-[#0C0C0C] border-r-[#0C0C0C] border-t-[3px] border-r-[3px] rotate-[-45deg] p-1">
                        <Image src= "/images/up-and-down-arrows.svg" alt ="swap" height={1} width={30} />
                    </button>
                </div>
                <div className="bg-[#1D1D21] rounded-[1rem] mt-[4px] mb-[.5rem] p-[1rem]" > 
                    <p className="font-poppins">Receive</p>
                    <div className="flex justify-between" >
                        <div className="flex cursor-pointer items-center" onClick={() => openPopup(2)}>
                            <Image alt="venomImg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/> 
                            <h3 className="font-Inter font-bold">{tokenTwo}</h3>
                            <Image src= "/images/angle-down.svg" alt ="gas"  height={1} width={30}/>
                        </div>
                        <div className="pr-[1rem]">
                            <input type="text" placeholder="0" className="bg-transparent outline-none font-[700] w-[5rem] md:w-[16rem] text-right font-Oswald text-[#808080]" />
                        </div>
                    </div>
                    <p className="font-poppins text-[#808080] mt-[2px]">Balance:&nbsp;<span className="">{tokenTwoBalance}</span></p>
                </div>
                {addr == null ? (
              <Button onAddrChange={handleAddrChange} />
          ) : (
            <button className="w-full mt-[1rem] hover:bg-[#00800045] transition-[.5s] bg-[#008000] font-raleway py-[1rem] rounded-[1rem] font-bold" disabled={isLoadingpairs} > <div className="flex justify-center">{renderButtonContent()}</div></button>
          )}
            </div>
            
          {/* BIG MODAL */}
          {/* BIG MODAL */}
          {/* BIG MODAL */}

        {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-neutral-900 p-4 rounded max-h-[60vh]">
            <div className="flex justify-between px-4 py-4">
                <div className="font-bold font-Oswald text-[1.5rem]">Select Token</div>
                <div><button
              onClick={closePopup}
             
              className="text-white hover:text-red-300 text-2xl "
            >
              X
            </button></div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Input Address  0:343....."
                className="bg-transparent font-poppins outline-none font-bold w-[60%] md:w-80 text-gray-700"
                value={input1}
                onChange={handeleInput1Change}
              />
              <button className="bg-green-500 transition-[.5s] font-Inter hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded " onClick={openModal}>
                Import Token
              </button>
            </div>
            <ul className="px-4">
                  <div className="cursor-pointer font-poppins" onClick={handleCancel}>Clear</div>
                    {savedTokens.map((token, index) => (
                  <li key={index} className="shadow-md py-2 cursor-pointer"
                  onClick={() => handleSavedData (token.symbol, token.decimals,token.rootAddress)}>

                    <div className="flex justify-between hover:bg-green-700 rounded">
                      <div>
                      <div className="p-4"> 
                    <Image alt="venomImg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/>
                    </div>
                      </div>
                      <div className="ml-[8px]">
                      <span className="font-Inter font-bold">{token.symbol}</span>
                        <br/>
                        <span className="font-poppins">{token.symbol}</span>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="overflow-y-auto h-[30vh]">
                  {tokenList.map((token) => (
                    <li
                    key={token.ticker}
                    className="shadow-md py-2 cursor-pointer"
                    onClick={() => handleItemClick(token.name, token.address, token.decimals)}
                  >
                
                      <div className="flex justify-between pr-[1rem] hover:bg-green-700 rounded">
                        <div className="p-4"> 
                        <Image alt="venomImg" src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1}/>
                        </div>
                        <div className="ml-[8px] w-[20%] text-[.8rem] font-poppins"><span className="text-[1.1rem] font-Inter font-bold">{token.name}</span>
                          <br />
                          {token.ticker}</div>
                      </div>
                    </li>
                  ))}
                </div>
      
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
          <div className="flex justify-between font-Oswald font-bold text-[1.5rem] mb-[1rem] p-2">
          <p>Find the token you want to Swap</p>
          <div><button
                    onClick={closeModal}
                    className=" hover:text-red-700 text-white font-bold text-2xl "
                  >
                    X
                  </button></div>
          </div>     
          <input type="text" value={rootAddress} onChange={handleInputChange}
          placeholder="Input Address 0:3456....."
          className="bg-transparent outline-none w-[85vw] h-[2rem] md:w-[25rem] border border-green-500 rounded font-poppins text-[#808080]"/>
         <div className="flex justify-between p-4">
      <div>
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green-500"></div>
        ) : (
          <span className="font-bold text-l">
            {symbol}
            <br />
            {decimals}
          </span>
        )}
      </div>
      <div
        className="font-bold cursor-pointer border hover:border-green-500 rounded px-4 font-Inter py-2 bg-neutral-500"
        onClick={handleImport}
        disabled={isLoading}
      >
        Import
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
