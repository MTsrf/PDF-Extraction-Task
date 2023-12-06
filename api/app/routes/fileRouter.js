const { fileFetching, fileUploading, extractFile } = require("../controller/fileController");
const { upload } = require("../helper/fileUploadHelper");
const { verifyUser } = require("../middleware/verifyToken");

const router = require("express").Router()


router.get("/fetch-file", verifyUser, fileFetching)


router.post("/add-file", verifyUser, upload.single("file"), fileUploading)

router.post("/extract-file/:id", verifyUser, upload.none(), extractFile)

module.exports = router;