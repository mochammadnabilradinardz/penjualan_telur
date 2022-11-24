/**memanggil model telur */
const telurModel = require(`../models/telur.model`)

//memangil model pack
const packModel = require(`../models/pack.model`)

/**memanggil model member */
const memberModel = require(`../models/member.model`)

const { request, response } = require("express")

/**memanggil model transaksi */
const transaksiModel = require(`../models/transaksi.model.js`)
const detailModel = require(`../models/detail_transaksi.model`)



/**function untuk menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        /*ambil data telur*/
        let telur = await telurModel.findAll()

        // ambil data pack
        let pack = await packModel.findAll()

        /**ambil data customer */
        let member = await memberModel.findAll()

        /**prepare data yang akan di passing ke view */
        let sendData = {
            dataTelur: telur,
            dataPack: pack,
            dataMember: member,
            page: `form-transaksi`,
            tgl_transaksi:``,
            dataTelurString:JSON.stringify(telur),
            dataPackString:JSON.stringify(pack),
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/**membuat fungsi untuk menambahkan telur ke keranjang */
exports.addToCart = async(request, response) => {
    try {
        /**dapetin data telur berdasarkan id telur yang dikirimkan */
        let selectedTelur = await telurModel.findByCriteria ({
            id: request.body.id_telur
        
        })
        let selectedPack = await packModel.findByCriteria ({
            id: request.body.id_pack
        })    
    

        /**+tampung/recive data yang dikirimkan */
        let storeData ={
            id_telur: request.body.id_telur,
            id_pack: request.body.id_pack,
            jenis_telur: selectedTelur[0].jenis_telur,
            nama_pack: selectedPack[0].nama_pack,
            jumlah_telur: request.body.jumlah_telur,
            jumlah_pack: request.body.jumlah_pack,
            harga_telur: request.body.harga_telur,
            harga_pack: request.body.harga_pack
        }
        /**masukkan data ke keranjang menggunakan session */
        request.session.cart.push(storeData)
        /**push() -> menambah data ke dalam array */

        /**direct ke halaman transaksi */
        return response.redirect(`/transaksi/add`)


    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


/**membuat function untuk menghapus data item */
exports.hapusCart= async (request,response) =>{
    try {
        /**ambil seluruh data cart pada session */
        let cart= request.session.cart

        /**ambil id telur yang akan dihapus dari cart */
        let id_telur = request.params.id

        let id_pack =request.params.id

        /**cari tau posisi index dari data yang akan dihapus */
        let index = cart.findIndex(item => item.id_telur == id_telur)
        
        let index1 = cart.findIndex(item => item.id_pack == id_pack)

        /**hapus data sesuai index yang ditemukan */
        cart.splice(index,1)

        cart.splice(index1,1)
        /**splice digunakan untuk menghapus data pada array */

        /**kembalikan data cart kedalam session */
        request.session.cart=cart

        /**direct ke halaman form-transaksi */
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/**menyimpan data transaksi */
exports.simpanTransaksi = async (request, response) =>{
    try {
        /**tampung data yang dikirimkan */
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.dataUser.id
        }

        /**simpang transaksi */
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        /**menampung isi cart */
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            /**hapus dulu key "nama_telur" dari cart */
            delete cart[i].nama_pack
            delete cart[i].jenis_telur

            /**tambahi key "id_transaksi" ke dlm cart */
            cart[i].id_transaksi = resultTransaksi.insertId

            /**eksekusi simpan cart ke detail_transaksi */
            await detailModel.add(cart[i])   
        }

        /**hapus cart nya */
        request.session.cart = []
        return response.redirect(`/transaksi/add`)
        
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/**membuat fungsi utk menampilkan data transaksi */
exports.showTransaksi = async (request, response) => {
    try {
        /**ambil data transaksi */
        let transaksi = await transaksiModel.findAll()

        /**sisipkan data detail dari setiap transaksi */
        for (let i = 0; i < transaksi.length; i++) {
           //ambil id transaksi
           let id = transaksi[i].id
            
           //ambil data detailnya sesuai id
           let detail = await detailModel.findByCriteria({id_transaksi: id})

           //sisipkan detail ke transaksinya
           transaksi[i].detail = detail
        }

        /**prepare data yg dikirim ke view */
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`,sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fuctio utk menghapus data transaksi
exports.hapusTransaksi = async(request,response) =>{
    try {
        // menampung data id yg dihapus
        let id=request.params.id

        // menghapus data detail transaksi
       await detailModel.delete({id_transaksi:id})

       //menhapus data transaksi
       await transaksiModel.delete({id: id})

       //kembali lagi ke halaman transaksi
       return response.redirect(`/transaksi`)
        
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}