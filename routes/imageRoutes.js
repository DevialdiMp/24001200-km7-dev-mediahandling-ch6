const express = require("express");
const upload = require("../libs/multer");
const {
    addImage,
    getAllImages,
    getImageById,
    updateImage,
    deleteImage,
} = require("../controllers/imageController");

const router = express.Router();

router.post("/add-image", upload.single("image"), addImage);
router.get("/get-all-image", getAllImages);
router.get("/getData/:id", getImageById);
router.put("/update-data/:id", upload.single("image"), updateImage);
router.delete("/delete-image/:id", deleteImage);

module.exports = router;
