/** file pengontrol berisi fungsi logika untuk
 * menerima permintaan dari pengguna dan memberikan tanggapan
 * kepada pengguna.
 *
 * jika pengontrol perlu mengelola data dalam basis data,
 * harus memuat file model terlebih dahulu.
 */

/** memuat file model telur */
const packModel = require(`../models/pack.model`)

/** -------------------------------------
 * buat fungsi untuk menangani permintaan
 * dengan url: /pack/ dengan method GET
 */
exports.showDataPackaging = async (request, response) => {
    try {
        /** mendapatkan data obat menggunakan model */
        let dataPack = await packModel.findAll()

        /** mengirim data ke view */
        let sendData = {
            page: `pack`,
            data: dataPack,
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
 * dengan url: /pack/add dengan method GET
 */
 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-pack`, // halaman yang akan ditampilkan
        /** atur data kosong karena ini fitur tambah */
        nama_pack: ``,
        harga: ``,
        /** mengatur rute target untuk mengirimkan data yang diisi */
        targetRoute: `/pack/add`,
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
        let newPack = {
            nama_pack: request.body.nama_pack,
            harga: request.body.harga,
            
        }

        /** fungsi panggilan untuk memasukkan ke tabel obat */
        await packModel.add(newPack)

        /** redirect ke halaman telur */
        return response.redirect(`/pack`)

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
 * dengan url: /pack/edit/ID dengan metode GET
 */
 exports.showEditPage = async (request, response) => {
    /** membaca ID yang dipilih dari parameter URL */
    let selectedID = request.params.id

    /** menyimpan ID yang dipilih untuk menolak "parameter" */
    let parameter = {
        id: selectedID // 'id' mirip dengan nama kolom tabel
    }

   /** fungsi panggilan untuk mendapatkan data dari database berdasarkan id yang dipilih */
       let selectedData = await packModel.findByCriteria(parameter)

    /** menyiapkan data untuk dikirim ke halaman tampilan */
    let sendData = {
        page: `form-pack`, // halaman yang akan ditampilkan
        /** mengatur setiap data berdasarkan data yang akan diubah */
        nama_pack: selectedData[0].nama_pack,
        harga: selectedData[0].harga,
    
        /** mengatur route target untuk mengirimkan data yang diisi */
        targetRoute: `/pack/edit/${selectedID}`,
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
        let newPack = {
            nama_pack: request.body.nama_pack,
            harga: request.body.harga,
        }

        /** call function for update to table of obat */
        await packModel.update(newPack, parameter)

        /** redirect to telur page */
        return response.redirect(`/pack`)

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
        await packModel.delete(parameter)

        /** redirect ke halaman telur */
        return response.redirect(`/pack`)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }

