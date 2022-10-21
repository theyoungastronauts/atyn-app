import styles from '../styles/components/Content.module.scss';
import Button from './Button';


import imgTitle from '../public/img/title-solo.png';
import imgYa from '../public/img/ya.png';
import Image from 'next/image';
import { Account } from '../interfaces';
import config from '../config';


interface Props {
    account: Account;
}

const Content = (props: Props) => {

    const handleDownload = async (type: string) => {

        if (type == "deck") {
            window.open(config.deckUrl)
        } else if (type == "script") {
            window.open(config.scriptUrl)
        }

        const response = await fetch(`/api/download/?type=${type}&email=${props.account.email}&name=${props.account.name}`);
        const body = await response.json();



    }

    return (
        <div>
            <div className={styles.titleContainer}>

                <Image src={imgTitle} alt="A Theater Near You" width={350} height={158} ></Image>
            </div>

            {props.account.name ? (
                <p className={styles.enjoy}>Enjoy your movie,<br />{props.account.name}!</p>
            ) : (
                <p className={styles.enjoy}>Enjoy your movie!</p>
            )}

            <div className={styles.buttons}>
                <div>

                    <Button label="Download Deck" onPressed={() => {
                        handleDownload('deck');

                    }} />

                </div>
                <div>
                    <Button label="Download Script" onPressed={() => {
                        handleDownload('script');
                    }} />

                </div>
            </div>

            <div className={styles.yaContainer}>
                <a href="https://theyoungastronauts.com" target={"_blank"} rel="noreferrer">

                    <Image src={imgYa} alt="TYA" width={100} height={119} ></Image>
                </a>
            </div>
        </div>)
}

export default Content;