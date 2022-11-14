import db from '../../../utils/db';

class AccessCreateListView {

    list = async (req, res) => {
      const items = await db.collection('access').get();
      const data = items.docs.map(item => ({
        id: item.id,
        ...item.data()
      }));
      return res.status(200).json(data);
    }

    create = async (req, res, data) => {
        const { id } = await db.collection('access').add(data);
        return res.status(201).json({id: id, ...data});
    }

    handle = async (req, res) => {
        
        if(req.method == 'GET') {
            return await this.list(req, res);
        } 

        if(req.method == 'POST') {
            const data = {
                'email': req.body['email'],
                'password': req.body['password'],
                'name': req.body['name']
            }

            return await this.create(req, res, data);
        }

        return res.status(405).json({});
    }

}

export default new AccessCreateListView().handle;

