
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccounts, createSession } from '../../../utils/sheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const password = req.query.password || "";

    const accounts = await getAccounts();
    const account = accounts.find(a => a.password == password);

    if (account) {
      return res.status(200).json({ success: true, account: { name: account.name, email: account.email } });
    }

    return res.status(400).json({ success: false });

  } else {
    res.status(400).json({ success: false });
  }
}


