import styles from '../styles/components/FadeContainer.module.scss'
interface Props {
    visible: boolean;
    children: JSX.Element,
}

const FadeContainer = (props: Props) => {
    return (
        <div className={props.visible ? styles.visible : styles.invisible}>
            {props.children}
        </div>
    )
}

export default FadeContainer;