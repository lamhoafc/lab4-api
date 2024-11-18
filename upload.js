const multer = require("multer");
const crypto = require('crypto'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        const randomString = crypto.randomBytes(4).toString('hex'); 
        cb(null, Date.now() + '-' + randomString + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;