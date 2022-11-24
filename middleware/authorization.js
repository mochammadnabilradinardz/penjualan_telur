const { request } = require("express");
const session = require("express-session");
const { response } = require("../routes/telur.route");

//** funngsi autorization */
exports.cekUser =(request,response,next) =>{
    //** fungsi ini digunakan utk 
    //mengecek data user yg tersimpan
    //di session
    // jika datanya tersimpan disession maka boleh utk mengakses fitur yg dinginkan
    //jika datanya tdk tersimpan di session maka akan dikembalikan ke hlm login


    if(request.session.dataUser === undefined){
        return response.redirect(`/auth`)
    }else{
        //lanjut
        next()
    }

    
}