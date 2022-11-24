/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const packController = require(`../controllers/pack.controller`)

// load authorization dari middleware
const authorization = require(`../middleware/authorization`)

/** izinkan route untuk membaca data urlencoded */
app.use(express.urlencoded({ extended: true }))

/** membuat route untuk mengakses data pack */
app.get("/",authorization.cekUser,packController.showDataPackaging)

// membuat route untuk mengakses tamabah pack
app.get("/add",authorization.cekUser,packController.showAddPage)

/** membuat route untuk proses penambahan jenis pack baru */
app.post("/add",authorization.cekUser,packController.processInsert)

// membuat route utk mengakses edit pack
app.get("/edit/:id",authorization.cekUser,packController.showEditPage)

// membuat route utk proses edit pack
app.post("/edit/:id",authorization.cekUser,packController.processUpdate)

// membuat route utk proses delete
app.get("/delete/:id",authorization.cekUser,packController.processDelete)

/** ekspor objek "app" ke file lain */
module.exports = app
