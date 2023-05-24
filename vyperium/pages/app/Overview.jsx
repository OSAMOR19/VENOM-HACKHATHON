import React, { useState, useEffect } from 'react'
import { AreaChart,  Area , Tooltip ,XAxis ,YAxis } from 'recharts';
import Image from "next/image"
import axios from "axios";
import Link from 'next/link';
import BreadCrumb from '@/pure components/BreadCrumb';
import HeadComp from '@/layout/HeadComp';
import Button from '../venom-connect/button';


const Overview = () => {
//This is the begining of what Bernard.O Added 
const [includeAccounts, setIncludeAccounts] = useState([]);
const [balance, setBalance] = useState(null);
const [extractedData, setExtractedData] = useState([]);
const [error, setError] = useState(null);
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



const fetchData = async () => {
  try {
    if (includeAccounts.length > 0) {
      const response = await axios.get(`/api/search?ownerAddress=${includeAccounts}`);
      const { balance } = response.data;
      setBalance(balance);
    }
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

useEffect(() => {
  fetchData();
}, [includeAccounts]);

const handleInputChange1 = (event) => {
  const { value } = event.target;
  const accounts = value.split(',').map((account) => account.trim());
  setIncludeAccounts(accounts);
};

useEffect(() => {
  fetchData();
}, []);

const renderBalance = () => {
  if (balance === null) {
    return null;
  }

  return <p>Balance: {balance}</p>;
};

const renderOwnerAddresses = () => {
  if (balance === null || balance === 0) {
    return null;
  }

  return (
    <div>
      <p>Owner Addresses:</p>
      <ul>
        {includeAccounts.map((address) => (
          <li key={address}>{address.slice(0, 4) + '...' + address.slice(-4)}</li>
        ))}
      </ul>
    </div>
  );
};



//On call of this Function it returns the values of the tokens and Balance of the wallet
const BalanceandToken = async (e) => {
e.preventDefault();
try {
    const response = await fetch(`/api/search?ownerAddress=${includeAccounts}`);
    const result = await response.json();

    if (response.ok) {
      setBalance(result.balance);
      setExtractedData(result.extractedData);
      setError(null);
    } else {
      setError(result.error);
      setBalance(null); 
      setExtractedData(null);
    }
  } catch (error) {
    console.error(error);
    setError('Internal Server Error');
    setBalance(null);
    setExtractedData(null);
  }
};

//This section contains details about transaction history.
const [dataTest, setDataTest] = useState({count: null, list: [], graph: []});

const [txTypes, setTxTypes] = useState(['Ordinary']);
const [timeGe, setTimeGe] = useState(0);
const [timeLe, setTimeLe] = useState(0);
const [balanceChangeGe, setBalanceChangeGe] = useState(0);
const [balanceChangeLe, setBalanceChangeLe] = useState(0);
const [limit, setLimit] = useState(3);
const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);



{/* Converts includeAccounts to Array */}


//On call of this function it returns the transaction history of the inputed Address
const transactionHistory = async (e) => {
  e.preventDefault();

  let countData = null;

  const countRequest = axios.post('/api/count', {
    includeAccounts,
    txTypes,
    timeGe,
    timeLe,
    balanceChangeGe,
    balanceChangeLe,
  });

  try {
    const countResponse = await countRequest;
    countData = countResponse.data.count;


  const graphRequest = axios.post('/api/graph', {
    includeAccounts,
    txTypes,
    timeGe,
    timeLe,
    balanceChangeGe,
    balanceChangeLe,
    limit: countData,
    offset,
  });

  const listRequest = axios.post('/api/list', {
    includeAccounts,
    txTypes,
    timeGe,
    timeLe,
    balanceChangeGe,
    balanceChangeLe,
    limit,
    offset,
  });

 
  const [graphResponse, listResponse] = await axios.all([
    graphRequest,
    listRequest
  ]);

  const listData = listResponse.data;
  const graphData = graphResponse.data.data2;

    setDataTest({ count: countData, list: listData, graph:graphData });
    setLoading(false);
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.error || 'An error occurred. Please try again later.';
    setError(errorMessage);
    setLoading(false);
  }
};

// const handleShowMore = () => {
//  setLimit(prevLimit => prevLimit + 10);
// };

// useEffect(() => {
//  transactionHistory(new Event('click'));
// }, [limit]);

const getResult = (e) => {
  e.preventDefault();
  BalanceandToken(e);
  transactionHistory(e);
};

 



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
      <HeadComp title="Vyperium - Overview" />
      <BreadCrumb 
        includeAccounts={includeAccounts} 
        handleInputChange1={handleInputChange1} 
        getResult={getResult} 
        renderOwnerAddresses={renderOwnerAddresses()}
        renderBalance={renderBalance()}
        balance={balance}
        textColor="#008000">
        {/**This returns the tokens in the wallet section */}
        {/* <div>         
              <div className="grid grid-cols-4 gap-4 text-white bg-neutral-800 rounded">
              <div className="font-bold">Asset</div>
              <div className="font-bold">Balance</div>
              <div className="font-bold">Price</div>
              <div className="font-bold">Value</div>
              {extractedData.map((data, index) => (
                <React.Fragment key={index}>
                  <div>{data.token}</div>
                  <div>{data.amount}</div>
                  <div></div>
                  <div></div>
                </React.Fragment>
              ))}         
            </div>
          </div>   */}
        {/*This returns thetransactions of the wallet address*/}
        <div className='flex align-center justify-center'>
        <Button/>
        </div>
        <div className="flex gap-[1rem] text-white">
          <div className="">
            <h3 className="font-[600] font-Oswald text-[1.5rem]">Performance</h3>
            <div className="h-[23rem] p-[1rem] mt-[8px] border-[1px] rounded-[12px] border-[#808080]">
              <p className="text-[2rem] font-poppins font-[600]">${balance / 1000000000}</p>
              <p className="text-[.9rem] font-Inter text-[#01A643]">+0% ($0.00)</p>
              <AreaChart 
                className=" font-Oswald"
                width={580} 
                height={250} 
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
            </div>
          </div>
          <div className="text-white flex-1">
            <h3 className="font-[600] mb-[8px] font-Oswald text-[1.5rem]">History</h3>
            {/* {dataTest.count !== null && <p>Total number of Transaction: {dataTest.count}</p>} */}
            <div className="h-[23rem] p-[1rem] mt-[8px] border-[1px] rounded-[12px] border-[#808080]">
              <table className="w-full">
                <tr className="border-b-[1px]">
                  <th align="left" className=" font-poppins pb-[10px]">Transaction Type</th>
                  <th align="right" className=" font-poppins pb-[10px]">Balance</th>
                </tr>
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
              </table>
              <div className=" border-t mt-3 flex items-center justify-center">
                <Link href="/app/History">
                  <button className="mt-[.6rem] hover:bg-[#000] transition-[.5s] py-[.35rem] text-[.8rem] px-3 border-[1px] rounded-[.3rem]">See More</button>
                </Link>
              </div>
                    {/* {dataTest.list.map((transaction, index) => (
                      <React.Fragment key={index}>
                        <div>{transaction.hash.slice(0, 10)}...</div>
                        <div>{transaction.txType}</div>
                        <div
                        className={`text-lg ${
                          transaction.balanceChange < 0 ? 'text-red-500' : 'text-green-500'
                        }`}
                      >{transaction.balanceChange / 1000000000}</div>
                        <div>{formatDateTime(transaction.time)}</div>
                      </React.Fragment>
                    ))} */}
            </div> 

            {/* <div className="text-center bg-green-500 p-5 rounded cursor-pointer w-40"
            onClick={handleShowMore}>
            Show More
            </div> */}
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
  {/* <div>
        <div className='bg-gray-500'>
          <form onSubmit={transactionHistory}>
            <div>
              
            </div>
            <div>
              <label>
                Transaction Types:
                <input
                  type="text"
                  value={txTypes}
                  onChange={(e) => setTxTypes(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Time Greater or Equal:
                <input
                  type="number"
                  value={timeGe}
                  onChange={(e) => setTimeGe(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Time Less or Equal:
                <input
                  type="number"
                  value={timeLe}
                  onChange={(e) => setTimeLe(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Balance Change Greater or Equal:
                <input
                  type="number"
                  value={balanceChangeGe}
                  onChange={(e) => setBalanceChangeGe(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Balance Change Less or Equal:
                <input
                  type="number"
                  value={balanceChangeLe}
                  onChange={(e) => setBalanceChangeLe(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Limit:
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div>
              <label>
                Offset:
                <input
                  type="number"
                  value={offset}
                  onChange={(e) => setOffset(parseInt(e.target.value))}
                />
              </label>
            </div>
            <button type="submit">Fetch Data</button>
          </form>
          </div>
        </div> */}
      </BreadCrumb>
    </>
  )
}

export default Overview
