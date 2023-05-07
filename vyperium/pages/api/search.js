import runApp from './hello.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await runApp(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
