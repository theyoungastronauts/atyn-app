import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Auth.module.scss';
import Button from './Button';
import imgReel from '../public/img/reel.png';
import { app, database } from '../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import Api from '../utils/api';

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

        const api = new Api();
        const account = await api.login(password);
        setLoading(false);

        if (account) {
            // if (typeof window !== "undefined") {
            //     localStorage.setItem('password', password);
            // }
            props.onSuccess(account);
        } else {
            setLoading(false);
            setError(true);
        }


    }

    // useEffect(() => {

    //     if (typeof window !== "undefined") {
    //         const password = localStorage.getItem('password');
    //         console.log({ password });
    //         if (password) {
    //             setPassword(password);
    //             setTimeout(() => {
    //                 handleAuth();
    //             }, 100);
    //         }
    //     }
    // }, []);

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