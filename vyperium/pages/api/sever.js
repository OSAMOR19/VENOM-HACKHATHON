import  { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function runApp(){
const endpoint = 'https://testnet-api.venomscan.com/v1/search';

const data = {
    query: '0:82b4baf4eac3e1deadc00e11c49d42f97c1a247f2fa3a42f60471024eddccfed'
  };

const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };

  axios.post(endpoint, data, { headers })
  .then(response => {
    console.log(response.data);
    // Do something with the response
  })
  .catch(error => {
    console.error(error);
    // Handle any errors
  });

}