import React, {useState, useEffect } from "react";
import Style from './inputStyle'

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

    return <div className="input-frame">
        <label className={`${(focus ? 'focus' : null)} ${(top ? 'top' : null)} ${(error ? 'error' : null)}`}>{children}</label>
        <input
            className={`${(focus ? 'focus' : null)} ${(error ? 'error' : null)}`}
            type={type} onFocus={()=>handleChangeFocus(true)}
            onBlur={()=>handleChangeFocus(false)}
            value={value}
            onChange={(event)=>handleChangeValue(event)}
            disabled={disable}/>
        <Style/>
    </div>
}


export default Input