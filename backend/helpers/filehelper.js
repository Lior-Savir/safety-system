'use strict';
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
        cb(null, 'uploads/' + req.body.collection +'/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});


const filefilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' 
        || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/vnd.rar'
        || file.mimetype === 'application/zip' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}



const upload = multer({storage: storage, fileFilter: filefilter});

module.exports = {upload}
