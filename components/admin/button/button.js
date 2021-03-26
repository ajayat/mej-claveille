
import styles from './button.module.sass'

const button = ({ children, variants, onClick }) => {
    return <>
        <button className={styles.button} variant={variants} onClick={onClick}>
            {children}
        </button>
    </>
}

export default button