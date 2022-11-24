/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const memberController = require(`../controllers/member.controller`)

// load authorization dari middleware
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route for access obat's data */
app.get("/",authorization.cekUser,memberController.showDataMember)

// membuat route untuk mengakses tamabah member
app.get("/add",authorization.cekUser,memberController.showAddPage)

/** membuat route untuk proses penambahan jenis telur baru */
app.post("/add",authorization.cekUser,memberController.processInsert)

// membuat route utk mengakses edit telur
app.get("/edit/:id",authorization.cekUser,memberController.showEditPage)

// membuat route utk proses edit telur
app.post("/edit/:id",authorization.cekUser,memberController.processUpdate)

// membuat route utk proses delete
app.get("/delete/:id",authorization.cekUser,memberController.processDelete)


/** export object "app" to another file */
module.exports = app
