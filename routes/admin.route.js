/** load express js */
const express = require(`express`)
const { authorized } = require("../config")

/** create object of express */
const app = express()

/** load obat controller */
const adminController = require(`../controllers/admin.controller`)

// load authorization dari middleware
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route for access obat's data */
app.get("/",authorization.cekUser,adminController.showDataAdmin)

//membuat route utk menambah admin
app.get("/add",authorization.cekUser,adminController.showAddPage)

// membuat route utk proses menambah admin
app.post("/add",authorization.cekUser,adminController.processInsert)

// membuat route utk mengakses edit admin
app.get("/edit/:id",authorization.cekUser,adminController.showEditPage)

//membuat route utk proses edit admin
app.post("/edit/:id",authorization.cekUser,adminController.processUpdate)

//membuat route menghapus admin
app.get("/delete/:id",authorization.cekUser,adminController.processDelete)

/** export object "app" to another file */
module.exports = app
