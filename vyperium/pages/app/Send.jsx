import React, { useState, useEffect, use } from 'react';
import HeadComp from '@/layout/HeadComp';
import Image from 'next/image';
import Button from '../venom-connect/button';
import axios from 'axios';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { Token_Root } from "./constant/abi/TokenRootAbi";
import { Token_Wallet } from './constant/abi/TokenWalletAbi';
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient, Address, Contract } from 'everscale-inpage-provider';


////////////////////////////////////////////////////////////////////////
//                 /         /                                         //
//  ///////   ///////  ///////   ////////   ///////  ///////  ///////  //
//    /     /         /     /  /            /     /  /            /   //
//    /     ///////   /     /   ///////     /     /  ///////      /    //
//   /           /   /     /         /     /     /  /            /     //
//  /     ///////   ///////   ///////     ///////  ///////  ///////    //
//                 /         /                                         //
////////////////////////////////////////////////////////////////////////



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




////////////////////////////////////////////////////////////////////////
//                 /         /                                         //
//  ///////   ///////  ///////   ////////   ///////  ///////  ///////  //
//    /     /         /     /  /            /     /  /            /   //
//    /     ///////   /     /   ///////     /     /  ///////      /    //
//   /           /   /     /         /     /     /  /            /     //
//  /     ///////   ///////   ///////     ///////  ///////  ///////    //
//                 /         /                                         //
////////////////////////////////////////////////////////////////////////



const Send = () => {

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




  const [address, setAddress] = useState('');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [ordering, setOrdering] = useState('createdatdescending');
  const [data, setData] = useState([]);
  const [addr, setAddr] = useState(null);
  const [tokenbalance, setTokenBalance] = useState('0');
  const [asset, setAsset] = useState('Venom');
  const [customAsset, setCustomAsset] = useState('')
  const [rootAddress, setRootAddress] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [recipient, setRecipient] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')

  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e) => {
    setRecipient(e.target.value);
    setIsInvalid(e.target.value.length < 50);
  };

  const handleNextClick = () => {
    setOffset(prevOffset => prevOffset + 5);
  };

  const handlePrevClick = () => {
    if (offset > 0) {
      setOffset(prevOffset => prevOffset - 5);
    }
  };

  const handleAddrChange = (newAddr) => {
    setAddr(newAddr);
    setAddress(newAddr);
  };

  const userAddress = new Address(addr);
  const contractAddress = new Address(rootAddress);
  const recipientAddress = new Address(recipient);

  const parsedDecimals = parseInt(decimals, 10);
  let result = BigInt(1);
  for (let i = 0; i < parsedDecimals; i++) {
    result *= BigInt(10);
  }
  
  const parsedTokenAmount = BigInt(Math.floor(tokenAmount));


  const finalResult = result * parsedTokenAmount;


  const [tokenWalletAddress, setTokenWalletAddress] = useState('');
  const setupTokenWalletAddress = async () => {
    try {
      const standalone = await VC?.getStandalone('venomwallet');
  
      const contractAddress = new Address(rootAddress);
  
      const contract = new standalone.Contract(Token_Root, contractAddress);
  
      const tokenWallet = await contract.methods.walletOf({
        answerId: 0,
        walletOwner: addr.toString(),
      }).call();
  
      if (!tokenWallet) return undefined;
  
      const walletAddress = tokenWallet.value0._address;
      return walletAddress;
    } catch (e) {
      console.error(e);
    }
  };

  
  useEffect(() => {
    const fetchTokenWalletAddress = async () => {
      const address = await setupTokenWalletAddress();
      setTokenWalletAddress(address);
    };

    if (addr && rootAddress) {
      fetchTokenWalletAddress();
    }
  }, [addr, rootAddress]);
  

    


  const send = async () => {
    if (isInvalid) {
      return; // Don't proceed if input value is invalid
    }

    const standalone = await VC?.getStandalone('venomwallet');

    if (provider) {
      const contractAddress = new Address(tokenWalletAddress);
      const contract = new provider.Contract(Token_Wallet, contractAddress);
  
      await contract?.methods
        .transfer({
          amount: finalResult.toString(),
          recipient: recipientAddress,
          deployWalletValue: '100000000',
          remainingGasTo: tokenWalletAddress,
          notify: true,
          payload: '',
        })
        .send({
          from: userAddress,
          amount: '1000000000', // Provide a valid amount object
          bounce: true,
        });

        handleSendSuccess();
    }
  };
  
  const handleSendSuccess = () => {
    setTokenAmount('');
    setRecipient('');
  };
  
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/send', {
          address,
          limit,
          offset,
          ordering,
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [address, limit, offset, ordering]);

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
      setAsset(symbol)
      setDecimals(decimals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (rootAddress, amount, token) => {
    setRootAddress(rootAddress);
    setTokenBalance(amount);
    setAsset(token);
    setIsOpen(false);
  };

  const handleImport = (event) => {
    setCustomAsset(event.target.value);
  };

  const handleButtonClick = () => {
    setRootAddress(customAsset)
    if (customAsset.length > 50) {
        setRootAddress(customAsset);
        setIsOpen(false);
        setTokenBalance('');
        setCustomAsset('');
        setAsset(symbol)
      } else {
        // Handle case where input length is not greater than 50
        console.log('Input must be greater than 50 characters');
      }
    };
    const Popup = ({isOpen, onClose}) => {
      if (!isOpen){
        return null;
      }

      const orderingOptions = [
        { value: 'createdatascending', label: 'First Token (Ascending)' },
        { value: 'createdatdescending', label: 'Last Token (Descending)' },
        { value: 'amountascending', label: 'Smallest Amount (Ascending)' },
        { value: 'amountdescending', label: 'Greatest Amount (Descending)' },
      ];
    
      const handleOrderingChange = (value) => {
        setOrdering(value);
      };

      const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
      };

      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className='bg-neutral-800 rounded-md p-4'>
          <button onClick={onClose} class=" hover:text-red-100 text-white  font-bold py-2 px-4 rounded">X</button>
          <div class="flex border border-green-300 p-4">
            <input
              type="text"
              placeholder="0:343....."
              className={`bg-transparent outline-none font-[700] w-[32rem] font-Oswald text-[#808080] ${
                isInvalid ? 'border-red-500' : ''
              }`}
              value={customAsset}
              onChange={handleImport}
            />
            <button onClick={handleButtonClick} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded">Import Token</button>
          </div>

          <ul class="mt-4">
            {data.map(({ rootAddress, token, amount }, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(rootAddress, amount, token)}
                class=" shadow-md py-2 text-[12px]   cursor-pointer"
              >
                <div className='flex justify-between'>
                  <div>
                  <strong>{token}</strong><br></br> 
                {rootAddress ? `${rootAddress.slice(0, 7)}....${rootAddress.slice(40, -20)}...${rootAddress.slice(-4)}` : ''}
                </div>
                {amount}
                </div>
              </li>
            ))}
          </ul>
          <div className='flex justify-between text-[12px]'>
          <button
            onClick={handleNextClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
        Next
      </button>

      <button
        onClick={handlePrevClick}
        disabled={offset === 0}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
      >
        Previous
      </button>
          </div>
        </div>

       <div className="relative inline-block">
        <div>
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              id="ordering-options"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
            >
              Ordering
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                />
              </svg>
            </button>
          </span>
        </div>

        {/* Dropdown options */}
        {isDropdownOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="ordering-options"
          >
            {orderingOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer"
                role="menuitem"
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={ordering === option.value}
                  onChange={() => handleOrderingChange(option.value)}
                  className="form-checkbox focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
      )
    }   

    const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };


  return (
    <>
      <HeadComp title="Vyperium - Send" />
      <section className="ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem] text-white">
        <h2 className="font-Oswald text-[2rem] font-[600]">Send</h2>
        <p className="font-Inter text-[rgb(128,128,128)] text-[.9rem]">Send any token on Venom Blockchain to any Venom wallet</p>
        <div className="relative border-[2px] border-[#1D1D21] mt-[2rem] w-[80%] rounded-[1rem] p-[2rem]">
          <ul className="font-poppins font-bold flex justify-around border-b-[1px] border-b-[#808080] pb-[1rem] mb-[1rem]">
            <li className="transition-[.5s] cursor-pointer text-[#008000] hover:text-[#008000]">Token</li>
            <li className="transition-[.5s] cursor-pointer hover:text-[#008000]">NFT</li>
          </ul>
          <div className="flex items-center mb-[1rem]">
            <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1} />
            <h3 className="font-Inter font-bold">Venom</h3>
            <Image src="/images/angle-down.svg" alt="gas" height={1} width={30} />
          </div>
          <div className=" bg-[#1D1D21] rounded-[1rem] p-[1rem]">
            <p className="font-poppins">Recipient</p>
            <div className="flex justify-between">
              <div className="pr-[1rem]">
                <input
                  type="text"
                  placeholder="Address, domain or identity"
                  className="bg-transparent outline-none font-[700] w-[32rem] font-Oswald text-[#808080]"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <Image src="/images/user.svg" className="rounded-[50%] " width={30} height={1} />
                <Image src="/images/angle-down.svg" alt="gas" height={1} width={30} />
              </div>
            </div>
            <p className="font-poppins text-[#808080] mt-[2px]">0x0000...</p>
          </div>
          <div className="bg-[#1D1D21] rounded-[1rem] mt-[4px] p-[1rem]">
            <p className="font-poppins">Asset</p>
            <div className="flex justify-between">
              <div className="flex items-center">
                <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px] cursor-pointer" width={30} height={1} onClick={openPopup} />
                <h3 className="font-Inter font-bold" onClick={openPopup}>{asset}</h3>
                <div>
                <Image src="/images/angle-down.svg" alt="gas" height={1} width={30} onClick={openPopup} className='cursor-pointer' />
                <Popup isOpen={isOpen} onClose={closePopup} ></Popup>
                </div>
              </div>
              <div className="pr-[1rem]">
                <input
                  type="text"
                  placeholder="0"
                  className="bg-transparent outline-none font-[700] w-[16rem] text-right font-Oswald text-[#808080]"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                />
              </div>
            </div>
            <p className="font-poppins text-[#808080] mt-[2px]">
              Balance:&nbsp;<span className="">{tokenbalance}</span>
            </p>
            <p className="font-poppins text-[#808080] mt-[2px]">
              Address:&nbsp;
              <span className="">{rootAddress ? `${rootAddress.slice(0, 7)}....${rootAddress.slice(40, -20)}...${rootAddress.slice(-4)}` : ''}</span>

            </p>
            <div>
      
    </div>
          </div>
          {addr == null ? (
            <div className="w-full mt-[1rem] bg-[#008000] cursor-pointer font-raleway py-[1rem] rounded-[1rem] font-bold flex justify-center items-center">
              <Button onAddrChange={handleAddrChange} />
            </div>
          ) : (
            <button className="w-full mt-[1rem] bg-[#008000] font-raleway py-[1rem] rounded-[1rem] font-bold" onClick={send}>Send</button>
          )}
        </div>
      </section>
    </>
  );
};

export default Send;
