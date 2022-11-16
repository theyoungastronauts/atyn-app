import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import AccessList from '../../components/manage/AccessList';
import SessionList from '../../components/manage/SessionList';
import DownloadList from '../../components/manage/DownloadList';
import { useEffect, useState } from 'react';


const Manage: NextPage = (props) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const submit = (e: any) => {
        e.preventDefault();
        if (password == "2Infinity*") {
            setAuthenticated(true);
        } else {
            setPassword("");
            alert("Access denied");
        }
    }

    if (!authenticated) {
        return <div className="container py-3 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div>

                <h3 className="text-center">Login</h3>
                <form onSubmit={e => submit(e)}>
                    <input className="form-control" autoFocus placeholder='password' type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </form>
            </div>
        </div>
    }

    return (
        <div className="container py-3" style={{ minHeight: "100vh" }}>
            <AccessList />
            <SessionList />
            <DownloadList />
        </div>
    );
}

export default Manage;