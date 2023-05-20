//This Api call counts the number of transaction that took place in the wallet address 
import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://devnet-api.venomscan.com/v1/transactions/count';

  /*const includeAccounts = ['0:4d94957e0d7fc89deffe626f282cbdc683e1bb5f92c37f160ee298dae702df17']*/

  const {
    includeAccounts,
    txTypes,
    timeGe,
    timeLe,
    balanceChangeGe,
    balanceChangeLe,
  } = req.body;

  const requestBody = {
    includeAccounts,
    txTypes,
    ...(timeGe !== 0 && { timeGe }),
    ...(timeLe !== 0 && { timeLe }),
    ...(balanceChangeGe !== 0 && { balanceChangeGe }),
    ...(balanceChangeLe !== 0 && { balanceChangeLe }),
  };

  try {
    const response = await axios.post(url, requestBody);
    const { count } = response.data; // Extract the count from the response data
    res.status(200).json({ count }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
