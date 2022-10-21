
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccounts, createSession, createDownload } from '../../../utils/sheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const email: string = req.query.email?.toString() || "";
        const name: string = req.query.name?.toString() || "";
        const type: string = req.query.type?.toString() || "";

        await createDownload({ email: email, name: name }, type);

        return res.status(200).json({ success: true });

    } else {
        return res.status(400).json({ success: false });

    }
}


