import React, { useState, useEffect } from 'react'
import { AreaChart,  Area , Tooltip ,XAxis ,YAxis,ResponsiveContainer } from 'recharts';
import Image from "next/image"
import axios from "axios";
import Link from 'next/link';
import BreadCrumb from '@/pure components/BreadCrumb';
import HeadComp from '@/layout/HeadComp';
import Button from '../venom-connect/button';
import { useData } from "../context/DataContext";



const Wallet = () => {
  const {setIsOnApp} = useData()
  setIsOnApp(true)
//This is the begining of what Bernard.O Added 
const [includeAccounts, setIncludeAccounts] = useState([]);
const [balance, setBalance] = useState(null);
const [extractedData, setExtractedData] = useState([]);
const [error, setError] = useState(null);
const [addr, setAddr] = useState(null);
const formatDateTime = (timestamp) => {
  const dateObj = new Date(timestamp * 1000);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return dateObj.toLocaleDateString(undefined, options);
};
const handleAddrChange = (newAddr) => {
  setAddr(newAddr);
  setIncludeAccounts([newAddr]);  //Set includeAccounts to the value of addr
};

useEffect(() =>{
  const fetchData = async () => {
    try{
      const response = await axios.get(`/api/search?ownerAddress=${includeAccounts}`);
      const { balance, extractedData } = response.data;

      setBalance(balance);
      setExtractedData(extractedData);
    } catch (error) {
      console.error(error);
      setBalance([])
      setExtractedData([])
    }
  };

  if (includeAccounts){
    fetchData();
  }  
},[includeAccounts]
);

const handleInputChange = (event) => {
  const { value } = event.target;
  const accounts = value.split(',').map((account) => account.trim());
  setIncludeAccounts(accounts);
};



// This section contains details about transaction history.
const [dataTest, setDataTest] = useState({ count: null, list: [], graph: [] });
const [txTypes, setTxTypes] = useState(['Ordinary']);
const [timeGe, setTimeGe] = useState(0);
const [timeLe, setTimeLe] = useState(0);
const [balanceChangeGe, setBalanceChangeGe] = useState(0);
const [balanceChangeLe, setBalanceChangeLe] = useState(0);
const [limit, setLimit] = useState(3);
const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);

useEffect (() => {
  const transactionHistory = async () => {
    let countData = null;

  try {
    const countResponse = await axios.post('/api/count', {
      includeAccounts,
      txTypes,
      timeGe,
      timeLe,
      balanceChangeGe,
      balanceChangeLe,
    });
    countData = countResponse.data.count;

    const graphResponse = await axios.post('/api/graph', {
      includeAccounts,
      txTypes,
      timeGe,
      timeLe,
      balanceChangeGe,
      balanceChangeLe,
      limit: countData,
      offset,
    });

    const listResponse = await axios.post('/api/list', {
      includeAccounts,
      txTypes,
      timeGe,
      timeLe,
      balanceChangeGe,
      balanceChangeLe,
      limit,
      offset,
    });
    const listData = listResponse.data;
    const graphData = graphResponse.data.data2;

    setDataTest({ count: countData, list: listData, graph: graphData });
    setLoading(false);
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again later.';
    setError(errorMessage);
    setLoading(false);
  }
}
 transactionHistory();
},[includeAccounts, txTypes, timeGe, timeLe, balanceChangeGe, balanceChangeLe, limit, offset] )
//const transactionHistory = async () => {
  

// Rest of the code...




const scaledData = dataTest.graph.map((transaction, index) => {
  const previousBalance = index > 0 ? dataTest.graph[index - 1].cumulativeBalance : null;
  const currentBalance = transaction.cumulativeBalance / 1000000000;

  let areaColor = null;
  if (previousBalance !== null) {
    areaColor = currentBalance > previousBalance ? 'green' : 'red';
  }

  return {
    time: transaction.time,
    Balance: currentBalance,
    areaColor: areaColor,
  };
});
  




//This is the end of what Bernard added in this section     
  return (
    <>
      <HeadComp title="Vyperium - Your Wallet" />
      {addr == null ? (
      <div className='font-[600] font-Oswald md:ml-[22%] md:w-[71%] md:pt-[4rem] md:mr-[7%] mt-[20vh] text-center'>
        <h3 className=" text-[1.5rem] mb-[4rem] text-white">
          Connect wallet to get started
        </h3>
        <Button onAddrChange={handleAddrChange}/>
      </div> ):(    
      <div className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[5rem]">
        <div className="flex items-center md:justify-end pb-[2rem] text-white">
          <div className="font-Inter flex gap-5">
                <Image src= "/images/user_img.svg" alt ="user_img" height={1} width={100}/>
            {/**This is the input section */}                
                <div className="pr-[1rem]">
                    
                        <div className="flex items-center">
                        <div onChange={handleInputChange}>
                        {includeAccounts && includeAccounts.map((address) => (
                         <p key={address}>{address.slice(0, 4) + '...' + address.slice(-4)}</p>
                        ))}
                        </div>
                        </div>
                    <p className="text-[2.6rem] font-poppins font-[600]">${Math.floor(balance  / 1000000000)}</p>
                    <p className="text-[.9rem] font-Inter text-[#01A643]">+0% ($0.00)</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row gap-[1rem] text-white">
          <div className="flex-1">
            <h3 className="font-[600] font-Oswald text-[1.5rem]">Performance</h3>
            <div className="h-[23rem] p-[1rem] mt-[8px] border-[1px] rounded-[12px] border-[#808080]">
              <p className="text-[2rem] font-poppins font-[600]">${balance / 1000000000}</p>
              <p className="text-[.9rem] font-Inter text-[#01A643]">+0% ($0.00)</p>
              {balance ==0 ? (<div className='text-white font-bold font-Inter pt-[6rem] text-[1.5rem] h-[580px] flex align-center justify-center'> No Transaction yet 😞!</div>
              ):(
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart 
                    className=" font-Oswald" 
                    data={scaledData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <XAxis  dataKey="time" tickFormatter={formatDateTime} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="Balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="text-white md:w-[35%]">
            <h3 className="font-[600] mb-[8px] font-Oswald text-[1.5rem]">History</h3>
            <div className="h-[23rem] p-[1rem] mt-[8px] border-[1px] rounded-[12px] border-[#808080]">
              <table className="w-full">
                <tbody>
                  <tr className="border-b-[1px]">
                    <th align="left" className=" font-poppins pb-[10px]">Transaction Type</th>
                    <th align="right" className=" font-poppins pb-[10px]">Balance</th>
                  </tr>
                  {dataTest.list == 0 && <tr className= "h-[15rem] text-[1.5rem] font-Inter font-[600] flex justify-center items-center"><td>No transaction yet 😞!</td></tr>}
                  {dataTest.list.map((transaction, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td align="left" className=" font-Inter pt-[10px]">
                          <p className=" font-poppins font-bold">
                            {transaction.txType}
                          </p>
                          {formatDateTime(transaction.time)}
                        </td>
                        <td
                          align="right"
                          className={`text-lg font-poppins ${
                          transaction.balanceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.balanceChange / 1000000000}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className=" border-t mt-3 flex items-center justify-center">
                <Link href="/app/History">
                  <button className="mt-[.6rem] hover:bg-[#ffffff45] transition-[.5s] py-[.35rem] text-[.8rem] px-3 border-[1px] rounded-[.3rem]">See More</button>
                </Link>
              </div>
            </div>        
          </div>
          </div>
          <div className=" text-white">
          <div className="mb-[1rem] mt-[2rem]">
            <h3 className="font-[600] font-Oswald text-[1.5rem]">
              Assets
            </h3>
          </div>
          <div className=" border-[1px] rounded-[10px] h-fit p-6">
            <div className="pb-[1rem] flex items-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="tm5rm07">
                <rect width="32" height="32" rx="2" fill="#2558D9"></rect>
                <path d="M7 11h15a3 3 0 013 3v8a3 3 0 01-3 3H8a1 1 0 01-1-1V11z" stroke="#fff" stroke-width="2"></path>
                <path d="M6 9a2 2 0 012-2h12a2 2 0 012 2H6z" fill="#fff"></path>
              </svg>&nbsp;
              <p className="font-poppins text-[1.3rem] font-bold">Wallet - ${balance / 1000000000}</p> 
            </div>
            <table className="w-[100%]">
              <tr>
                <th className=" font-poppins text-sm" align="left">ASSET</th>
                <th className=" font-poppins text-sm font-[300]" align="left">PRICE</th>
                <th className=" font-poppins text-sm font-[300]" align="left">BALANCE</th>
                <th className=" font-poppins text-sm font-[300]" align="left">VALUE</th>
              </tr>
              { extractedData == 0 && <tr className= " font-[600] font-poppins"><td>No Asset On this Wallet 😱!</td></tr>}
              {extractedData.map((data, index) => (
                <React.Fragment key={index}>
                  <tr className=" border-t-[1px] cursor-pointer hover:bg-black hover:border-t-0 transition-[.5s]">
                    <td className="py-[1rem] font-Inter pl-[8px]" align="left">
                      <p className="font-poppins font-bold">{data.token}</p>
                      Venom
                    </td>
                    <td className="font-Inter" align="left">Coming Soon</td>
                    <td className="" align="left">{data.amount}</td>
                    <td className="font-Inter" align="left">Coming Soon</td>
                  </tr>
                </React.Fragment>
              ))}
            </table>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Wallet
