import Image from 'next/image';
import styles from '../styles/components/Logline.module.scss';

import imgLogline from '../public/img/logline.gif';

interface Props {
    handleNext: Function;
}

const Logline = (props: Props) => {

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.image}>
                    <Image src={imgLogline} width={741} height={423} alt="ATNY Logline" />
                </div>
                <div className={styles.continueContainer}>
                    <div className={styles.continue} onClick={() => props.handleNext()}>Continue</div>
                </div>
            </div>
        </div>
    )
}

export default Logline;