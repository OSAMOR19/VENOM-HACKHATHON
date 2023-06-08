import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { currencyAddresses, limit, offset, ordering } = req.body;

    const data = {
      currencyAddresses,
      limit,
      offset,
      ordering
    };

    const response = await axios.post('https://devnetapi.web3.world/v1/pairs/', data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const responseData = response.data;
    const pairs = responseData.pairs;

    // Return the pairs data to the frontend
    res.status(200).json({ pairs });
  } catch (error) {
    // Handle any errors that occurred during the request
    res.status(500).json({ error: 'An error occurred' });
  }
}
