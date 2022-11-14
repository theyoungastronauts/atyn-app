/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";


const SessionList = () => {
    const [items, setItems] = useState([]);

   const load = async () => {
        const res = await axios.get('/api/session');

        const data = res.data.sort((a, b) => a.date._seconds > b.date._seconds ? 1 : -1)
        setItems(data);
    }

    useEffect( () => {
        load();
        return () => {};
    }, []);

 

    return (
        <div>
            <h3>Sessions</h3>
            <table className="table table-striped">
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{new Date( item.date._seconds * 1000).toLocaleDateString()} {new Date( item.date._seconds * 1000).toLocaleTimeString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default SessionList;