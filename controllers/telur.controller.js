/** file pengontrol berisi fungsi logika untuk
 * menerima permintaan dari pengguna dan memberikan tanggapan
 * kepada pengguna.
 *
 * jika pengontrol perlu mengelola data dalam basis data,
 * harus memuat file model terlebih dahulu.
 */

/** memuat file model telur */
const telurModel = require(`../models/telur.model`)

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /obat/ dengan method GET
 */
exports.showDataTelur = async (request, response) => {
    try {
        /** mendapatkan data obat menggunakan model */
        let dataTelur = await telurModel.findAll()

        /** mengirim data ke view */
        let sendData = {
            page: `telur`,
            data: dataTelur,
            dataUser: request.session.dataUser
        }

        /** mengatur tampilan view untuk fungsi ini */
        return response.render(`../views/index`, sendData)
        
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
 * dengan url: /telur/add dengan method GET
 */
 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-telur`, // halaman yang akan ditampilkan
        /** atur data kosong karena ini fitur tambah */
        jenis_telur: ``,
        harga: ``,
        stok: ``,
        /** mengatur rute target untuk mengirimkan data yang diisi */
        targetRoute: `/telur/add`,
        dataUser: request.session.dataUser
    }

    /** mengatur tampilan halaman untuk fungsi ini */
    return response.render(`../views/index`, sendData)
}

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /telur/add dengan method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** membaca data telur dari user yang dikirim */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,
        }

        /** fungsi panggilan untuk memasukkan ke tabel obat */
        await telurModel.add(newTelur)

        /** redirect ke halaman telur */
        return response.redirect(`/telur`)

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
 * dengan url: /telur/edit/ID dengan metode GET
 */
 exports.showEditPage = async (request, response) => {
    /** membaca ID yang dipilih dari parameter URL */
    let selectedID = request.params.id

    /** menyimpan ID yang dipilih untuk menolak "parameter" */
    let parameter = {
        id: selectedID // 'id' mirip dengan nama kolom tabel
    }

   /** fungsi panggilan untuk mendapatkan data dari database berdasarkan id yang dipilih */
       let selectedData = await telurModel.findByCriteria(parameter)

    /** menyiapkan data untuk dikirim ke halaman tampilan */
    let sendData = {
        page: `form-telur`, // halaman yang akan ditampilkan
        /** mengatur setiap data berdasarkan data yang akan diubah */
        jenis_telur: selectedData[0].jenis_telur,
        harga: selectedData[0].harga,
        stok: selectedData[0].stok,
        /** mengatur route target untuk mengirimkan data yang diisi */
        targetRoute: `/telur/edit/${selectedID}`,
        // dataUser: request.session.dataUser
        dataUser: request.session.dataUser
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
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,
        }

        /** call function for update to table of obat */
        await telurModel.update(newTelur, parameter)

        /** redirect to telur page */
        return response.redirect(`/telur`)

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
 * dengan url: /obat/delete dengan method POST*/

 exports.processDelete = async (request, response) =>{
    try {
        // membaca id yang dipilih dari parameter url
        let selectedID = request.params.id

        // menyimpan id yang dipilih dari params
        let parameter ={
            id:selectedID
        }

        /**memanggil fungsi untuk memasukkan ke tabel obat */
        await telurModel.delete(parameter)

        /** redirect ke halaman telur */
        return response.redirect(`/telur`)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }

