//This API call returns the balance of Venom in a wallet and the tokens in a particular wallet
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const endpoint = 'https://devnet-api.venomscan.com/v1/search';

    const { ownerAddress } = req.query;

//    const ownerAddress = '0:33478651d9c7b44c1b45c2dfe85edf7a5d24692f5222f0a25c176b1abfd95e51'
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
    const { balances } = response2.data;
    const extractedData = balances.filter(balance => balance.amount !== "0").map(balance => ({
    token: balance.token,
    amount: balance.amount,
    ownerAddress: balance.rootAddress
    }));

    res.json({ balance, extractedData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interna Server Error' });
  }
}
