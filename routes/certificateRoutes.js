const express = require("express");
const router = express.Router();

const {
    addCertificate,
    getCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate
} = require("../controllers/certificateController");

router.post("/", addCertificate);
router.get("/", getCertificates);
router.get("/:id", getCertificateById);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

module.exports = router;