import styles from '../styles/components/Content.module.scss';
import Button from './Button';


import imgTitle from '../public/img/title-solo.png';
import imgYa from '../public/img/ya.png';
import Image from 'next/image';
import { Account } from '../interfaces';
import config from '../config';
import { useState } from 'react';
import FadeContainer from './FadeContainer';
import { trackDownload } from '../utils/tracking';
import { useDetectAdBlock } from "adblock-detect-react";

interface Props {
    account: Account;
}

const Content = (props: Props) => {

    const [previewVisible, setPreviewVisible] = useState(false);
    const adBlockDetected = useDetectAdBlock();


    const handleDownload = async (type: string) => {

        if (type == "deck") {
            window.open(config.deckUrl)
        } else if (type == "script") {
            window.open(config.scriptUrl)
        }

        trackDownload(props.account.email, type);

    }


    const handleView = async () => {

        if (adBlockDetected) {
            window.open(`https://indd.adobe.com/view/${config.deckEmbedId}`);
        } else {
            setPreviewVisible(true);
        }

        trackDownload(props.account.email, "deckView");

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

            <div style={{ textAlign: 'center' }}>
                <Button label="Open Deck" large onPressed={() => {
                    handleView();
                }} />
            </div>

            <div style={{ height: 16 }}></div>

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

            <div className={previewVisible ? styles.previewVisible : styles.previewInvisible}>

                <iframe className={styles.preview} src={`https://indd.adobe.com/embed/${config.deckEmbedId}?startpage=1&allowFullscreen=false`} width="100%" height="100%" frameBorder={0} allowFullScreen={true}></iframe>
                <div className={styles.previewClose} onClick={() => setPreviewVisible(false)}>[close]</div>
            </div>
        </div>)
}

export default Content;