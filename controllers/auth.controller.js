//** load model admin */
const adminModel = require(`../models/admin.model`)

//** load crypt */
const crypt = require(`../crypt`)
const { request, response } = require("../routes/telur.route")

//** function utk  menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

//** function utk proses autentication */
exports.authentication = async (request, response) => {
    try {
        //** menampung data username & password */
        let username = request.body.username
        let password = request.body.password

        //** chek kecocokan username */
        let result = await adminModel.findByCriteria({ username: username })

        //** cek keberadaan data apoteker */
        if (result.length > 0) {
            //** kita cek kecocokan password */
            if (password === crypt.deskripsi(result[0].password)) {
                //** login berhasil */
                //** menyikmpan data user ke session */
                //** user data =label of session */
                request.session.dataUser = result[0]

                // data user =label of session
                request.session.cart=[]

                return response.redirect(`/telur`)

            } else {
                //** login gagal */
                return response.redirect(`/auth`)
            }
        } else {
            //** data apoteker tidak ada */
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

//** membuat funcition utk logout */
exports.logout = async (request,response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined
        
        // kembali ke halaman login
        return  response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
        
    }
}