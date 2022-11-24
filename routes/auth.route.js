//** panggil si express */
const express = require(`express`)

//** buat object utk express */
const app = express()

//** minta ijin utk membaca request dari user */
app.use(express.urlencoded({ extended:true }))

//**  panggil controlerr auth */
const authController = require(`../controllers/auth.controller`) 

//** routenutk menampilkan halaman login */
app.get(`/`,authController.showLogin)

//** membuat route utk proses login */
app.post(`/`,authController.authentication)

//** membuat route utk proses logout */
app.get(`/logout`,authController.logout)

//** export object app */
module.exports = app