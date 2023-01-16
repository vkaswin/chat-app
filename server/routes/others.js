const { Router } = require("express");
const { getMetaData, uploadFile } = require("../controllers/others");
const multer = require("multer");
const router = Router();
const storage = multer.memoryStorage();

/* Multer DiskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
}); */

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // limiting files size to 1 MB
  },
});

router.get("/metadata", getMetaData);
router.post("/fileupload", upload.array("file"), uploadFile);

module.exports = router;
