import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import AccessList from '../../components/manage/AccessList';
import SessionList from '../../components/manage/SessionList';
import DownloadList from '../../components/manage/DownloadList';


const Manage: NextPage = (props) => {
    return (
        <div className="p-3" style={{ minHeight: "100vh" }}>
            <AccessList />
            <SessionList />
            <DownloadList />
        </div>
    );
}

export default Manage;