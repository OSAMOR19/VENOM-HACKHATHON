import axios from 'axios';

export default async function Balance(req, res) {
  try {
    const response = await axios.post('https://testnet-tokens.venomscan.com/v1/balances', {
      limit: 1000,
      offset: 0,
      ordering: 'amountdescending',
      ownerAddress: '0:80956d2e1fc2bddcae82cab4a382af7dc266d3721373ff8cb6d0d14e0bb2ec2b'
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while fetching the balances.');
  }
}

