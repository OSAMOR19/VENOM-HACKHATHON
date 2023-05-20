//This Api Call returns the list of transaction that have taken place in a wallet
import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://devnet-api.venomscan.com/v1/transactions/list';

  /*const includeAccounts = ['0:4d94957e0d7fc89deffe626f282cbdc683e1bb5f92c37f160ee298dae702df17']*/

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

  const requestBody = {
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
    const response = await axios.post(url, requestBody);
    const data = response.data.map(transaction => ({
      balanceChange: transaction.balanceChange,
      txType: transaction.txType,
      hash: transaction.hash,
      time: transaction.time,
    }));
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

