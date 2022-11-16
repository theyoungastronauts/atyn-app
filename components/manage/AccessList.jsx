/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";


const AccessList = () => {
    const [items, setItems] = useState([]);

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


   const load = async () => {
        const res = await axios.get('/api/access');
        setItems(res.data);
    }

    useEffect( () => {
        load();
        return () => {};
    }, []);

    const create = async () => {
        const data= {
            name: name,
            email: email,
            password:password,
        }
        await axios.post('/api/access', data);

        setName("");
        setEmail("");
        setPassword("");
        load();
    }

    return (
        <div>
            <h3>Access</h3>
            <table className="table table-striped">
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{item.name}</td>
                        <td>{item.password}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <h4>Add</h4>
                <div className="form-group py-1">
                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"></input>
                </div>
                <div className="form-group py-1">
                    <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
                </div>
                <div className="form-group py-1">
                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
                </div>
                <div class="text-end">
                    <button className="btn btn-primary" onClick={ () => create()}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AccessList;