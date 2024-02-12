const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const createDiskStorate = (storagePath) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, storagePath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
}


// Create the multer instance
module.exports.getMulterUpload = (storagePath) => {
    return multer({
        storage: createDiskStorate(storagePath),
        fileFilter: function (req, file, cb) {
            if (path.extname(file.originalname) !== '.zip') {
                return cb(new Error('Only zip are allowed'))
            }

            cb(null, true)
        }
    });
}

