import db from '../../../utils/db';

class DownloadListView {

    list = async (req, res) => {
      const items = await db.collection('downloads').get();
      const data = items.docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      return res.status(200).json(data);
    }

    handle = async (req, res) => {
        
        if(req.method == 'GET') {
            return await this.list(req, res);
        } 

        return res.status(405).json({});
    }

}

export default new DownloadListView().handle;

