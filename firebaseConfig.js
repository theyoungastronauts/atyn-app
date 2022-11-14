import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDkym8iHZkRYMGOuqjyTzJmVqM9DQ4rz7s",
    authDomain: "atyn-app.firebaseapp.com",
    projectId: "atyn-app",
    storageBucket: "atyn-app.appspot.com",
    messagingSenderId: "315228330035",
    appId: "1:315228330035:web:3f98d599a55f412f36ab46",
    measurementId: "G-PMZBF5BS16"

};



const app = initializeApp(firebaseConfig);

let analytics = null;

if(app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
const database = getFirestore(app);


export {app, analytics, database};