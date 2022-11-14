import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import AccessList from '../../components/manage/AccessList';


const Manage: NextPage = (props) => {
    return (
        <div className="p-3" style={{ minHeight: "100vh" }}>
            <AccessList />
        </div>
    );
}

export default Manage;