import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { rootAddress: reqRootAddress } = req.body;

    if (!reqRootAddress) {
      return res.status(400).json({ message: 'Root Address is required.' });
    }

    const url = `https://devnet-tokens.venomscan.com/v1/root_contract/root_address/${encodeURIComponent(reqRootAddress)}`;

    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json'
      }
    });

    const { symbol, rootAddress, decimals } = response.data;

    const responseData = {
      symbol,
      rootAddress,
      decimals
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
