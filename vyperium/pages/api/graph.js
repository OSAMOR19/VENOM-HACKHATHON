import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://devnet-api.venomscan.com/v1/transactions/list';

  

  const {
    includeAccounts,
    txTypes,
    timeGe,
    timeLe,
    balanceChangeGe,
    balanceChangeLe,
    limit,
    offset
  } = req.body;

  const requestBody2 = {
    // Second request parameters here
    includeAccounts,
    txTypes,
    ...(timeGe !== 0 && { timeGe }),
    ...(timeLe !== 0 && { timeLe }),
    ...(balanceChangeGe !== 0 && { balanceChangeGe }),
    ...(balanceChangeLe !== 0 && { balanceChangeLe }),
    limit,
    offset
  };

  try {

    // Second request
    const response2 = await axios.post(url, requestBody2);
    const transactions2 = response2.data.reverse();
    let cumulativeBalance = 0;

    const data2 = transactions2.map(transaction => {
      const balanceChange = parseFloat(transaction.balanceChange);
      cumulativeBalance += balanceChange;

      return {
        balanceChange: transaction.balanceChange,
        txType: transaction.txType,
        hash: transaction.hash,
        time: transaction.time,
        cumulativeBalance: cumulativeBalance
      };
    });

    res.status(200).json({ data2 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
