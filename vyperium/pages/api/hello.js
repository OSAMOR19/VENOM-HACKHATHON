// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function runApp(req, res){
const endpoint = 'https://testnet-api.venomscan.com/v1/search';

const data = {
    query: '0:82b4baf4eac3e1deadc00e11c49d42f97c1a247f2fa3a42f60471024eddccfed'
  };

const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(endpoint, data, { headers });
    const account = response.data[0].data;
    const balance = account.balance;
    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}