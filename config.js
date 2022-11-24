/** load library mysql2  */
let mysql = require(`mysql2`)

/** mengatur nama host untuk terhubung ke mysql */
const hostName = `localhost`

/** atur username untuk koneksi ke mysql */
const username = `root`

/** mengatur password untuk terhubung ke mysql */
const password = ``

/** menetapkan nama database yang dipilih */
const dbName = `penjualan_telur`

/** buat objek 'connection'
 * untuk membuat connection dari mysql  */

const connection = mysql.createConnection({
    host: hostName,
    user: username,
    password: password,
    database: dbName
}) 

/** ekspor objek 'connection' untuk
 * gunakan di file lain */
module.exports = connection