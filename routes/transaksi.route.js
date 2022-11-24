//** panggil si express */
const express = require(`express`)

//** buat object dari express */
const app = express()

//** ijin membaca daata dari request body */
app.use(express.urlencoded({ extended: true }))

//** panggil controllernya transaksi */
const transaksiController =
require(`../controllers/transaksi.controller`)

//** panggil middleware utk authorization */
const authorization = require(`../middleware/authorization`)

//** route utk menampilkan form transaksi */
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

/**route untuk menyimpan data transaksi */
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

// route utk tampil data transaksi
app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

// route utk menghapusdata transaksi
app.get(`/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

/**exports object app */
module.exports = app