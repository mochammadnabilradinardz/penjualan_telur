//** memanggil library crypto.js */
const crypto=require(`crypto-js`)

//**membuat function utk enkripsi */
exports.enkripsi =(plainText) =>{
    //bikin secret key
    let secretKey =`YTTTA`

    //** proses enkripsi */
    //** AES =advance encryption standart */
    let result = crypto.AES.encrypt(plainText,secretKey).toString()
    return result
}

//** membuat fungsi deskripsi */
exports.deskripsi =(chiperText)=>{
    //** define secretkey */
    let secretKey=`YTTTA`

    //** proses deskripsi */
    let byte=crypto.AES.decrypt(chiperText,secretKey)
    let result = byte.toString(crypto.enc.Utf8)

    return result
}