// pages/api/currencyInfo.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { currency_addresses } = req.body;

    const apiUrl = 'https://devnetapi.web3.world/v1/currencies_usdt_prices';

    const response = await axios.post(apiUrl, { currency_addresses }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const currencyInfo = response.data;

    res.status(200).json(currencyInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
