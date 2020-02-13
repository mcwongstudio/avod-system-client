export default function getUrl(url, data) {
    let dataPart = ''
    for(let key in data) {
        dataPart += `${key}=${data[key]}&`
    }
    const l = dataPart.length
    const dataParam = dataPart.substr(0, l - 1)
    return `${url}?${dataParam}`
}