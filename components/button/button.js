
import Style from './buttonStyle'

const button = ({ children, variants, onClick }) => {
    return <>
        <button id="admin-button" className={variants} onClick={onClick}>
            {children}
        </button>
        <Style/>
    </>
}

export default button