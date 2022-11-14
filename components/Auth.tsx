import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Auth.module.scss';
import Button from './Button';
import imgReel from '../public/img/reel.png';
import { app, database } from '../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { trackSession } from '../utils/tracking';

interface Props {
    onSuccess: Function;
}

const Auth = (props: Props) => {

    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        setError(false);
        setLoading(true);

        const ref = collection(database, "access");
        const q = query(ref, where('password', "==", password));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            const snapshot = querySnapshot.docs[0];
            const data = snapshot.data();

            trackSession(data.email);
            setLoading(false);

            const account = { name: data.name, email: data.email, password: password };

            if (typeof window !== "undefined") {
                localStorage.setItem('account', JSON.stringify(account))
            }

            props.onSuccess(account);

        } else {
            setLoading(false);
            setError(true);
        }


    }

    useEffect(() => {

        if (typeof window !== "undefined") {
            const existing = localStorage.getItem('account');

            if (existing) {
                const account = JSON.parse(existing);
                if (account.email) {
                    trackSession(account.email);
                    props.onSuccess(account);
                }
            }
        }
    }, []);

    return (
        <div className={styles.ropeBox}>
            <div className={styles.ropeLeft}></div>
            <div className={styles.ropeRight}></div>

            <div className={styles.container}>
                <div className={styles.labelContainer}>
                    <div className={styles.label}>Password</div>
                </div>
                <div className={styles.inputContainer}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleAuth();
                    }} >

                        <input value={password} className={styles.input} type="password" onChange={(e) => { setPassword(e.target.value) }} ></input>
                    </form>
                </div>

                <div className={styles.submitContainer}>
                    <Button label="Enter" onPressed={handleAuth}></Button>


                </div>
                <div className={styles.error}>
                    {error ? (<span>Invalid ticket.</span>) : <span>&nbsp;</span>}
                </div>
                {loading ? (
                    <div className={styles.loader}>
                        <div className={styles.loaderImage}>

                            <Image src={imgReel} width={185} height={185} alt="loading" />
                        </div>
                    </div>) : null}

            </div>
        </div>
    )

}

export default Auth;