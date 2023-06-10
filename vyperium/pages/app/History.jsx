import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios'
import { useData } from "@/context/DataContext";

const History = () => {
  const { setIsOnApp } = useData();
  setIsOnApp(true);
  const [includeAccounts, setIncludeAccounts] = useState([]);
  const [dataTest, setDataTest] = useState({ count: null, list: [] });
  const router = useRouter();
  const { clickedIncludeAccounts } = router.query;
  const {addr} = router.query
  const [txTypes, setTxTypes] = useState(['Ordinary']);
  const [timeGe, setTimeGe] = useState(0);
  const [timeLe, setTimeLe] = useState(0);
  const [balanceChangeGe, setBalanceChangeGe] = useState(0);
  const [balanceChangeLe, setBalanceChangeLe] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (clickedIncludeAccounts) {
      setIncludeAccounts([clickedIncludeAccounts]);
    }
  }, [clickedIncludeAccounts]);

  useEffect(() => {
    if (addr) {
      setIncludeAccounts([addr]);
    }
  }, [addr]);







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

  const loadMoreTransactions = () => {
    setOffset((prevOffset) => prevOffset + 10);
    setLimit((prevLimit) => prevLimit + 10);
  };

  useEffect(() => {
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

        setDataTest({ count: countData, list: listData });
        setLoading(false);
      } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || 'An error occurred. Please try again later.';
        setError(errorMessage);
        setLoading(false);
      }
    };

    transactionHistory();
  }, [includeAccounts, txTypes, timeGe, timeLe, balanceChangeGe, balanceChangeLe, limit, offset]);

  return (
    <div className="md:ml-[22%] mx-[2%] md:w-[71%] pt-[1rem] md:mr-[7%] mt-[4rem] md:mt-[5rem] text-white">
      <table className="w-full">
        <tbody>
          <tr className="border-b-[1px]">
            <th align="left" className="font-poppins pb-[10px]">Transaction Type</th>
            <th align="right" className="font-poppins pb-[10px]">Balance</th>
          </tr>
          {dataTest.list.length === 0 && (
            <tr className="h-[15rem] text-[1.5rem] font-Inter font-[600] flex justify-center items-center">
              <td>No transactions yet 😞!</td>
            </tr>
          )}
          {dataTest.list.map((transaction, index) => (
            <React.Fragment key={index}>
              <tr className="bg-neutral">
                <td align="left" className="font-Inter pt-[10px]">
                  <p className="font-poppins font-bold">{transaction.txType}</p>
                  {formatDateTime(transaction.time)}
                </td>
                <td
                  align="right"
                  className={`text-lg font-poppins ${
                    transaction.balanceChange < 0 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {transaction.balanceChange / 1000000000}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {dataTest.list.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            className="bg-[#008000] hover:bg-green-900 text-white font-semibold py-2 px-4 rounded"
            onClick={loadMoreTransactions}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
