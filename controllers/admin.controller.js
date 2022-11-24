/** file pengontrol berisi fungsi logika untuk
 * menerima permintaan dari pengguna dan memberikan tanggapan
 * kepada pengguna.
 *
 * jika pengontrol perlu mengelola data dalam basis data,
 * harus memuat file model terlebih dahulu.
 */

/** memuat file model admin */
const adminModel=require(`../models/admin.model`)
const { request, response } = require("../routes/telur.route")
// memanggil file cryp.js
const crypt=require(`../crypt`)

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /admin/ dengan method GET
 */
exports.showDataAdmin = async(request,response) =>{
    try {
        // mendapatkan data admin dari model
        let dataAdmin = await adminModel.findAll()

        // mengirim data ke view
        let sendData={
            page :`admin`,
            data :dataAdmin,
            dataUser: request.session.dataUser
        }

        // mengatur view utk tampilan diatas
        return response.render(`../views/index`,sendData)
        
    } catch (error) {
        /** kesalahan penanganan */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /admin/add dengan method GET
 */
 exports.showAddPage = async (request, response) => {
    try{
    let sendData = {
        page: `form-admin`, // halaman yang akan ditampilkan
        /** atur data kosong karena ini fitur tambah */
        nama_admin: ``,
        username: ``,
        password: ``,
        /** mengatur rute target untuk mengirimkan data yang diisi */
        targetRoute: `/admin/add`,
        dataUser: request.session.dataUser
    }

    /** mengatur tampilan halaman untuk fungsi ini */
    return response.render(`../views/index`, sendData)

    }catch (error){
        let sendData={
            message:error
        }
        return response.render(`../views/error-page`)
    }
}

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /admin/add dengan method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** membaca data admin dari user yang dikirim */
        let newAdmin = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password),
        }

        /** fungsi panggilan untuk memasukkan ke tabel obat */
        await adminModel.add(newAdmin)

        /** redirect ke halaman telur */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
} 


/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /admin/edit/ID dengan metode GET
 */
 exports.showEditPage = async (request, response) => {
    /** membaca ID yang dipilih dari parameter URL */
    let selectedID = request.params.id

    /** menyimpan ID yang dipilih untuk menolak "parameter" */
    let parameter = {
        id: selectedID // 'id' mirip dengan nama kolom tabel
    }

   /** fungsi panggilan untuk mendapatkan data dari database berdasarkan id yang dipilih */
       let selectedData = await adminModel.findByCriteria(parameter)

    /** menyiapkan data untuk dikirim ke halaman tampilan */
    let sendData = {
        page: `form-admin`, // halaman yang akan ditampilkan
        /** mengatur setiap data berdasarkan data yang akan diubah */
        nama_admin: selectedData[0].nama_admin,
        username: selectedData[0].username,
        password: selectedData[0].password,
        /** mengatur route target untuk mengirimkan data yang diisi */
        targetRoute: `/admin/edit/${selectedID}`,
        dataUser: request.session.dataUser,
        deskripsi:crypt.deskripsi
    }

    /** mengatur tampilan halaman untuk fungsi ini */
    return response.render(`../views/index`, sendData)

}
/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /obat/edit dengan metode POST*/

 exports.processUpdate = async (request, response) => {
    try {
        /** membaca ID yang dipilih dari parameter URL */
        let selectedID = request.params.id

        /** menyimpan ID yang dipilih ke objek "parameter" */
        let parameter = {
            id: selectedID // 'id' mirip dengan nama kolom tabel
        }

        /** membaca data obat dari user yang telah dikirim */
        let newAdmin = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password:crypt.enkripsi(request.body.password)
        }

        /** call function for update to table of obat */
        await adminModel.update(newAdmin, parameter)

        /** redirect to telur page */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /admin/delete dengan method POST*/

 exports.processDelete = async (request, response) =>{
    try {
        // membaca id yang dipilih dari parameter url
        let selectedID = request.params.id

        // menyimpan id yang dipilih dari params
        let parameter ={
            id:selectedID
        }

        /**memanggil fungsi untuk memasukkan ke tabel obat */
        await adminModel.delete(parameter)

        /** redirect ke halaman telur */
        return response.redirect(`/admin`)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }
