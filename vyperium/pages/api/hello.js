// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function runApp(req, res){
const endpoint = 'https://testnet-api.venomscan.com/v1/search';

const data = {
      query: req.body.query,
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