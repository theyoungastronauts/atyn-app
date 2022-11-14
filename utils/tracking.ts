import { database } from '../firebaseConfig';

import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const trackSession = (email: string) => {
    const ref = collection(database, 'session');
    addDoc(ref, {
        email: email,
        date: serverTimestamp()
    })
}

const trackDownload = (email: string, type: string) => {
    const ref = collection(database, 'downloads');
    const data = {
        email: email,
        type: type,
        date: serverTimestamp()
    }
    console.log(data)
    addDoc(ref, data);
}


export { trackSession, trackDownload }