import Image from "next/image"
import axios from "axios";
import React, { useState, useEffect } from 'react'

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
  if (balance === 0) {
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
const [dataTest, setDataTest] = useState({count: null, list: []});

const [txTypes, setTxTypes] = useState(['Ordinary']);
const [timeGe, setTimeGe] = useState(0);
const [timeLe, setTimeLe] = useState(0);
const [balanceChangeGe, setBalanceChangeGe] = useState(0);
const [balanceChangeLe, setBalanceChangeLe] = useState(0);
const [limit, setLimit] = useState(10);
const [offset, setOffset] = useState(0);

{/* Converts includeAccounts to Array */}
const handleInputChange = (e) => {
  const inputValue = e.target.value;
    const arrayValue = inputValue.split(',');

    setIncludeAccounts(arrayValue);
}

//On call of this function it returns the transaction history of the inputed Address
const transactionHistory = async (e) => {
    e.preventDefault();

    const countRequest = axios.post('/api/count', {
        includeAccounts,
        txTypes,
        timeGe,
        timeLe,
        balanceChangeGe,
        balanceChangeLe,
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
          
      try {
        const [countResponse, listResponse] = await axios.all([
          countRequest,
          listRequest
        ]);
        const countData = countResponse.data.count;
        const listData = listResponse.data;
        setDataTest({ count: countData, list: listData });
      } catch (error) {
        console.error(error);
      }
    };

    const handleShowMore = () => {
      setLimit(prevLimit => prevLimit + 10);
    };
    useEffect(() => {
      transactionHistory(new Event('click'));
    }, [limit]);

    const  getResult =(e) => {
        e.preventDefault();
        BalanceandToken(e);
        transactionHistory(e);
    }
//This is the end of what Bernard added in this section     
  return (
    <section className="overflow-y-auto ml-[22%] w-[71%] pt-[1rem] mr-[7%] mt-[5rem]">
        <div className="flex items-center justify-between text-white">
            <div className=" flex items-center gap-5">
                <button className="font-Inter border-[1px] rounded-[6px] h-[3rem] px-[1rem] border-[#008000]">Add Wallet</button>
                <Image src= "/images/share.svg" alt ="gas" height={1} width={20}/>
                <Image src= "/images/tg.svg" alt ="gas" height={1} width={20}/>
            </div>
            <div className="font-Inter flex gap-5">
                <Image src= "/images/user_img.svg" alt ="gas" height={1} width={100}/>
{/**This is the input section */}                
                <div className="">
                    <div className="flex items-center">                       
                    <input
                    type="text"
                    value={includeAccounts}
                    onChange={handleInputChange}
                    className="text-black"
              
            />
            <Image 
            src= "/images/angle-down.svg" 
            alt ="gas" height={1} width={30}
            onClick={getResult}
            className="cursor-pointer"/>
                </div>
                    <p className="text-[2.6rem] font-[600]">{balance / 1000000000}</p>
                    <p className="text-[.9rem] text-[#01A643]">+0% ($0.00)</p>
                </div>
            </div>
        </div>
        <div>
      <input
        type="text"
        placeholder="Enter Owner Addresses (comma-separated)"
        value={includeAccounts.join(',')}
        onChange={handleInputChange1}
      />
      <div className="bg-green-500 rounded text-white cursor-pointer w-50"
        onClick={getResult}
      >{renderOwnerAddresses()}
      {renderBalance()}</div>
    </div>
{/**This returns the tokens in the wallet section */}
<div>         
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
  </div>  
{/*This returns thetransactions of the wallet address*/}

<div className="text-white">
  <div>History</div>
  {dataTest.count !== null && <p>Total number of Transaction: {dataTest.count}</p>}
<div>
<div className="grid grid-cols-4 gap-4 text-white bg-neutral-800 rounded">
      <div className="font-bold">Hash</div>
      <div className="font-bold">Transaction Type</div>
      <div className="font-bold">Balance Change</div>
      <div className="font-bold">Time</div>
      {dataTest.list.map((transaction, index) => (
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
      ))}         
    </div>
  </div> 

<div className="text-center bg-green-500 rounded p-5 rounded cursor-pointer w-40"
 onClick={handleShowMore}>
Show More
</div>
    
</div>
<div>
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
      </div>
    </section>
  )
}

export default Overview
