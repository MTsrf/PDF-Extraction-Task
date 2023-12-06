const multer = require("multer")

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    console.log("files ===>", file)
    if (file.mimetype === 'application/pdf') {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed.'), false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
module.exports = { upload }


