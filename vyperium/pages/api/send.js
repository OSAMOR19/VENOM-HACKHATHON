import axios from 'axios';

export default async function fetchData(req, res) {
  const { address, limit, offset, ordering } = req.body;


  const url = `https://devnet-tokens.venomscan.com/v1/address/${encodeURIComponent(address)}/balances`;

  try {
    const response = await axios.post(url, {
      limit,
      offset,
      ordering,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = response.data.balances.filter((balance) => balance.amount !== '0')
      .map(({ rootAddress, token, amount }) => ({ rootAddress, token, amount }));

      res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
