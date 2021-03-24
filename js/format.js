

const format = (d) => {
    const date = new Date(d)
    return `${date.getDate().toString().padStart(2, '0')}/${
        (date.getMonth()+1).toString().padStart(2, '0')}/${
        date.getFullYear().toString().padStart(4, '0')} ${
        date.getHours().toString().padStart(2, '0')}:${
        date.getMinutes().toString().padStart(2, '0')}`
}

export { format }