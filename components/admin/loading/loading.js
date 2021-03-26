import React from 'react'

import styles from './loading.module.sass'

const Loading = () => {
    let elements = []
    for(let i=0;i<3;i++) {
        elements.push(<div key={i} />)
    }
    return <div className={styles.loadingContainer}>
        <div className={styles.loadingFrame}>
            <div className={styles.loadingContent}>
                { elements }
            </div>
        </div>
    </div>
}

export default Loading