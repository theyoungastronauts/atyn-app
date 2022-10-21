import styles from '../styles/components/Button.module.scss';


interface Props {
    label: string;
    onPressed: Function;
}


const Button = (props: Props) => {
    return (
        <button className={styles.pushable} onClick={() => props.onPressed()}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
                {props.label}
            </span>
        </button>
    );
}

export default Button;