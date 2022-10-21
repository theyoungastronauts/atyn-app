import Image from 'next/image';
import styles from '../styles/components/Title.module.scss';
import imgTitle from '../public/img/title.png';


const Title = () => {

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.image}>
                    <Image src={imgTitle} width={624} height={347} alt="ATNY Logline" />
                </div>


            </div>
        </div>
    )
}

export default Title;