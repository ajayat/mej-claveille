import React from 'react'

import Style from './loadingStyle'

const Loading = () => {
    let elements = []
    for(let i=0;i<3;i++) {
        elements.push(<div key={i}/>)
    }
    return <div id="public-loading-container">
        <div className="loading-frame">
            <div className="loading">
                { elements }
            </div>
        </div>
        <Style />
    </div>
}

export default Loading