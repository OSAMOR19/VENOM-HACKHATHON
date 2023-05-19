//This API call returns the balance of Venom in a wallet and the tokens in a particular wallet
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const endpoint = 'https://devnet-api.venomscan.com/v1/search';
    const { ownerAddress } = req.query;

    const data = {
      query: ownerAddress,
    };

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // First API call
    const response1 = await axios.post(endpoint, data, { headers });
    const account = response1.data[0].data;
    const balance = account.balance;

    // Second API call
    const apiUrl = `https://devnet-tokens.venomscan.com/v1/address/${encodeURIComponent(ownerAddress)}/balances`;
    const response2 = await axios.post(apiUrl, {
      limit: 1000,
      offset: 0,
      ordering: 'amountdescending',
      ownerAddress: ownerAddress
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    res.json({ balance, data: response2.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
