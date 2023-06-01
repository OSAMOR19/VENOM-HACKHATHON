import React, { useState, useEffect } from 'react';
import HeadComp from '@/layout/HeadComp';
import Image from 'next/image';
import Button from '../venom-connect/button';
import axios from 'axios';
import { Token_Wallet } from './abi/TokenWalletAbi';
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient, Address, Contract } from 'everscale-inpage-provider';

const Send = () => {
  const [address, setAddress] = useState('0:33478651d9c7b44c1b45c2dfe85edf7a5d24692f5222f0a25c176b1abfd95e51');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [ordering, setOrdering] = useState('createdatdescending');
  const [data, setData] = useState([]);
  const [addr, setAddr] = useState(null);
  const [tokenbalance, setTokenBalance] = useState('0');
  const [asset, setAsset] = useState('Venom');
  const [customAsset, setCustomAsset] = useState('')
  const [rootAddress, setRootAddress] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAddrChange = (newAddr) => {
    setAddr(newAddr);
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

  const handleItemClick = (rootAddress, amount, token) => {
    setRootAddress(rootAddress);
    setTokenBalance(amount);
    setAsset(token);
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleImport = (event) => {
    setCustomAsset(event.target.value);
  };

  const handleButtonClick = () => {
    setRootAddress(customAsset)
    if (customAsset.length > 50) {
        setRootAddress(customAsset);
        setDropdownOpen(!dropdownOpen);
        setCustomAsset('');
      } else {
        // Handle case where input length is not greater than 50
        console.log('Input must be greater than 50 characters');
      }
    };

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
const initVenomConnect = async () => {
    return new VenomConnect({
      theme: 'dark',
      checkNetworkId: 1000,
      checkNetworkName: "Venom testnet",
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
                        id: 1000,
                        group: 'venom_testnet',
                        type: 'jrpc',
                        data: {
                          endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
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

  const [VC, setVC] = useState();
  useEffect(() => {
    (async () => {
      const _vc = await initVenomConnect();
      setVC(_vc);
    })();
  }, []);


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

const userAddress = new Address (addr);
const contractAddress = new Address('0:88fabbb54d7f73d7eb73b4fe2b982122ea9975cdbc6fb87c3c834f0e53a7f0c6');
const recipientAddress = new Address('0:a88d39840c57b3a91e95012498cdc24fad4629fdb1e2bef3014f0763089b2ea7');
const amount1 = '100000000' // Assuming toNano returns a valid numeric value
const sendAmount = '10000';

const send = async () => {
    if (provider) {
      const contract = new provider.Contract(Token_Wallet, contractAddress);
  
      await contract?.methods
        .transfer({
          amount: sendAmount,
          recipient: recipientAddress,
          deployWalletValue: amount1,
          remainingGasTo: userAddress,
          notify: true,
          payload: '',
        })
        .send({
          from: userAddress,
          amount: '', // Provide a valid amount object
          bounce: true,
        });
    }
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
            <p className="font-poppins">Asset:{asset}</p>
            <div className="flex justify-between">
              <div className="flex items-center">
                <Image src="/images/venomimg.jpg" className="rounded-[50%] mr-[8px]" width={30} height={1} />
                <h3 className="font-Inter font-bold">Token</h3>
                <Image src="/images/angle-down.svg" alt="gas" height={1} width={30} onClick={handleDropdownToggle} />
              </div>
              <div className="pr-[1rem]">
                <input
                  type="text"
                  placeholder="0"
                  className="bg-transparent outline-none font-[700] w-[16rem] text-right font-Oswald text-[#808080]"
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
          </div>
          {addr == null ? (
            <div className="w-full mt-[1rem] bg-[#008000] cursor-pointer font-raleway py-[1rem] rounded-[1rem] font-bold flex justify-center items-center">
              <Button onAddrChange={handleAddrChange} />
            </div>
          ) : (
            <button className="w-full mt-[1rem] bg-[#008000] font-raleway py-[1rem] rounded-[1rem] font-bold" onClick={send}>Send</button>
          )}
        </div>
        <h2>Data:</h2>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={handleDropdownToggle}>
            Select an item
          </button>
          {dropdownOpen && (
            <>
            <div className='flex border-green'>
            <input
             type="text"
             placeholder='0:343.....'
             className="bg-transparent outline-none font-[700] w-[16rem] text-right font-Oswald text-[#808080]" value={customAsset} onChange={handleImport}/>
            <button onClick={handleButtonClick}>Import Token</button>
            </div>
            <ul className="dropdown-menu">
                {data.map(({ rootAddress, token, amount }, index) => (
                    <li
                        key={index}
                        onClick={() => handleItemClick(rootAddress, amount, token)}
                        className="dropdown-item"
                    >
                        <strong>Root Address:</strong> {rootAddress}, <strong>Token:</strong> {token}, <strong>Amount:</strong>{' '}
                        {amount}
                    </li>
                ))}
            </ul>
            
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Send;
