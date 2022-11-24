/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const telurController = require(`../controllers/telur.controller`)

// load authorization dari middleware
const authorization = require(`../middleware/authorization`)

/** izinkan route untuk membaca data urlencoded */
app.use(express.urlencoded({ extended: true }))

/** membuat route untuk mengakses data telur */
app.get("/",authorization.cekUser,telurController.showDataTelur)

// membuat route untuk mengakses tamabah telur
app.get("/add",authorization.cekUser,telurController.showAddPage)

/** membuat route untuk proses penambahan jenis telur baru */
app.post("/add",authorization.cekUser,telurController.processInsert)

// membuat route utk mengakses edit telur
app.get("/edit/:id",authorization.cekUser,telurController.showEditPage)

// membuat route utk proses edit telur
app.post("/edit/:id",authorization.cekUser,telurController.processUpdate)

// membuat route utk proses delete
app.get("/delete/:id",authorization.cekUser,telurController.processDelete)

/** ekspor objek "app" ke file lain */
module.exports = app
