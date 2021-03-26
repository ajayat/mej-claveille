import React, {useState, useEffect } from "react";
import styles from './input.module.sass'

const Input = ({children, type, error, disable, sendValue, defaultValue}) => {

    const [focus, setFocus] = useState(false)
    const [top, setTop] = useState(false)
    const [value, setValue] = useState(defaultValue)

    if(defaultValue.length > 0 && !top) {
        setTop(true)
    }

    const handleChangeFocus = (state) => {
        setFocus(state)
        if(state) {
            setTop(true)
        }
        else if(value.length === 0) {
            setTop(false)
        }
    }

    useEffect(() => {
        if(defaultValue !== undefined) {
            setValue(defaultValue)
        }
    })

    if(disable) {
        if(focus) {
            setFocus(false)
        }
    }

    const handleChangeValue = (event) => {
        setValue(event.target.value)
        sendValue(event.target.value)
    }

    return <div className={styles.inputFrame}>
        <label
            focus={focus ? 'focus' : null}
            top={top ? 'top' : null}
            error={error ? 'error' : null}>

            {children}</label>
        <input
            error={error ? 'error' : null}
            focus={focus ? 'focus' : null}
            type={type} onFocus={()=>handleChangeFocus(true)}
            onBlur={()=>handleChangeFocus(false)}
            value={value}
            onChange={(event)=>handleChangeValue(event)}
            disabled={disable}/>
    </div>
}


export default Input