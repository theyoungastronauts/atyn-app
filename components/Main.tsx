import Image from 'next/image';
import { useState } from 'react';
import { Account } from '../interfaces';
import styles from '../styles/components/Main.module.scss';
import Auth from './Auth';
import Content from './Content';
import FadeContainer from './FadeContainer';


const Main = () => {

    const [account, setAccount] = useState<Account | undefined>(undefined);

    return (
        <div className={styles.container}>
            <div className={styles.sprocket}></div>
            <div className={styles.border}></div>
            <div className={styles.barcode}></div>
            <div className={styles.pg13}></div>
            <div className={styles.void}></div>

            {account ? <Content account={account} /> : <Auth onSuccess={(a: any) => {
                setAccount(a);
            }} />}

        </div>
    )
}

export default Main;