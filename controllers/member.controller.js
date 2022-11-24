/** file pengontrol berisi fungsi logika untuk
 * menerima permintaan dari pengguna dan memberikan tanggapan
 * kepada pengguna.
 *
 * jika pengontrol perlu mengelola data dalam basis data,
 * harus memuat file model terlebih dahulu.
 */

/** memuat file model member */
const memberModel=require(`../models/member.model`)
const { request, response } = require("../routes/member.route")

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /member/ dengan method GET
 */
exports.showDataMember = async(request,response) =>{
    try {
        // mendapatkan data admin dari model
        let dataMember = await memberModel.findAll()

        // mengirim data ke view
        let sendData={
            page :`member`,
            data :dataMember,
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
 * dengan url: /member/add dengan method GET
 */
 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-member`, // halaman yang akan ditampilkan
        /** atur data kosong karena ini fitur tambah */
        nama_member: ``,
        alamat: ``,
        telepon: ``,
        /** mengatur rute target untuk mengirimkan data yang diisi */
        targetRoute: `/member/add`,
        dataUser: request.session.dataUser
    }

    /** mengatur tampilan halaman untuk fungsi ini */
    return response.render(`../views/index`, sendData)
}

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /member/add dengan method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** membaca data admin dari user yang dikirim */
        let newMember = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon,
        }

        /** fungsi panggilan untuk memasukkan ke tabel obat */
        await memberModel.add(newMember)

        /** redirect ke halaman telur */
        return response.redirect(`/member`)

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
 * dengan url: /member/edit/ID dengan metode GET
 */
 exports.showEditPage = async (request, response) => {
    /** membaca ID yang dipilih dari parameter URL */
    let selectedID = request.params.id

    /** menyimpan ID yang dipilih untuk menolak "parameter" */
    let parameter = {
        id: selectedID // 'id' mirip dengan nama kolom tabel
    }

   /** fungsi panggilan untuk mendapatkan data dari database berdasarkan id yang dipilih */
       let selectedData = await memberModel.findByCriteria(parameter)

    /** menyiapkan data untuk dikirim ke halaman tampilan */
    let sendData = {
        page: `form-member`, // halaman yang akan ditampilkan
        /** mengatur setiap data berdasarkan data yang akan diubah */
        nama_member: selectedData[0].nama_member,
        alamat: selectedData[0].alamat,
        telepon: selectedData[0].telepon,
        /** mengatur route target untuk mengirimkan data yang diisi */
        targetRoute: `/member/edit/${selectedID}`,
        // dataUser: request.session.dataUser
        dataUser: request.session.dataUser
    }

    /** mengatur tampilan halaman untuk fungsi ini */
    return response.render(`../views/index`, sendData)

}
/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /member/edit dengan metode POST*/

 exports.processUpdate = async (request, response) => {
    try {
        /** membaca ID yang dipilih dari parameter URL */
        let selectedID = request.params.id

        /** menyimpan ID yang dipilih ke objek "parameter" */
        let parameter = {
            id: selectedID // 'id' mirip dengan nama kolom tabel
        }

        /** membaca data obat dari user yang telah dikirim */
        let newMember = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon,
        }

        /** call function for update to table of obat */
        await memberModel.update(newMember, parameter)

        /** redirect to telur page */
        return response.redirect(`/member`)

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
 * dengan url: /member/delete dengan method POST*/

 exports.processDelete = async (request, response) =>{
    try {
        // membaca id yang dipilih dari parameter url
        let selectedID = request.params.id

        // menyimpan id yang dipilih dari params
        let parameter ={
            id:selectedID
        }

        /**memanggil fungsi untuk memasukkan ke tabel obat */
        await memberModel.delete(parameter)

        /** redirect ke halaman telur */
        return response.redirect(`/member`)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }
