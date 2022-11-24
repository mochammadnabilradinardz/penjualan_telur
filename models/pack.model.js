/** file model untuk pack berisi proses CRUD */

/** memanggil objek 'connection'
 * dari config.js */
 const connection = require(`../config`)

 /** mengatur nama tabel untuk dikelola dalam file model ini */
 const tableName = `pack`
 
 /** ----------------------------------------------------------------------- 
  * buat dan ekspor
  *berfungsi untuk mengambil data dari tabel*/
 exports.findAll = () => {
     return new Promise((resolve, rejected) => {
         /** mendefinisikan query untuk mendapatkan semua data */
         let query = `select * from ${tableName}`
 
         /** tampilkan query sebagai konsol masuk */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** mengembalikan resolusi dengan data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * buat dan ekspor
  * berfungsi untuk mengambil data dari tabel dengan kriteria tertentu */
 exports.findByCriteria = (parameter) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * parameter berisi data seperti ini:
          * parameter = {
          * jenis_telur: 'telur 1',
          *harga: 1000
          * }
          *
          * untuk membuat Query untuk mendapatkan data menggunakan kriteria, kita harus
          * atur setiap kunci dan nilai parameternya
          * menjadi String
          *----------------------------------------------
          */
 
         /** ----------------------------------------------
          * menyusun daftar kunci parameter dan nilainya sebagai string */
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' jenis_telur="telur 1" and harga="1000" '
          * ------------------------------------------------
          */
 
         /** define query to get all data */
         let query = `select * from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * buat dan ekspor
  * berfungsi untuk memasukkan data baru ke tabel */
 exports.add = (dataObject) => {
     return new Promise((resolve, rejected) => {
         /** ---------------------------------------------------
          * dataObject berisi data seperti ini:
          * objek data = {
          * jenis_telur: `telur 1`,
          * stok: `10`,
          * harga: `15000`
          * }
          *
          * untuk membuat Query untuk memasukkan data, kita harus
          * atur setiap kunci dan nilainya menjadi string
          *----------------------------------------------
          */
 
         /** ----------------------------------------------
          *atur daftar kunci dataObject sebagai string */
         let columns = Object.keys(dataObject).join()
         /** result:
          * columns = 'jenis_telur, stok, harga,'
          * -----------------------------------------------
          */
 
         /** ---------------------------------------------- 
          * arrange list of dataObject's values as string */
         let values = Object.values(dataObject)
             .map(value => `"${value}"`).join()
         /** result:
          * values = ' "telur 1", "100", "15000" '
          * ------------------------------------------------
          */
 
         /** create query for insert */
         let query = `insert into ${tableName} (${columns}) values (${values})`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to update data of table */
 exports.update = (dataObject, parameter) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * dataObject contain data like this:
          * dataObject = {
          *      jenis_telur: `telur 1`,
          *      stok: `100`,
          *      harga: `15000`
          * }
          * 
          * parameter contain data like this:
          * parameter = {
          *      id: '1'
          * }
          * 
          * to create Query for update data, we have to
          * arrange every key and its value of dataObject to be string,
          * then arrange every key and its value of parameter
          * to be string
          * ----------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of dataObject's keys and its values as string */
         let updateData = Object
             .keys(dataObject)
             .map(key => `${key}="${dataObject[key]}"`)
             .join()
         /** result:
          * updateData = ' jenis_telur="telur 1",
          * stok="100", harga="15000" '
          * ------------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of parameter's keys and its value as string */
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' id="1" '
          * ------------------------------------------------
          */
 
         /** create query for update */
         let query = `update ${tableName} set ${updateData} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to delete data of table */
 exports.delete = (parameter) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * parameter contain data like this:
          * parameter = {
          *      id: '1'
          * }
          * 
          * to create Query for update data, we have to
          * arrange every key and its value of parameter
          * to be string
          * ----------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of parameter's keys and its value as string */
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' id="1" '
          * ------------------------------------------------
          */
 
         /** create query for delete */
         let query = `delete from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 