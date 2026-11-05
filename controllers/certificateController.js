const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const collection = () => getDB().collection("certificates");

// CREATE
const addCertificate = async (req, res) => {
    try {
        const {
            title,
            organization,
            category,
            issueDate,
            description,
            image,
            credentialLink
        } = req.body;

        if (!title || !organization || !category) {
            return res.status(400).json({
                message: "Title, organization and category are required"
            });
        }

        const certificate = {
            title,
            organization,
            category,
            issueDate,
            description,
            image,
            credentialLink,
            createdAt: new Date()
        };

        const result = await collection().insertOne(certificate);

        res.status(201).json({
            message: "Certificate added successfully",
            certificateId: result.insertedId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ALL
const getCertificates = async (req, res) => {
    try {
        const certificates = await collection()
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ONE
const getCertificateById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const certificate = await collection().findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!certificate) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updateCertificate = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const { _id, ...updatedData } = req.body;

        const result = await collection().updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({
            message: "Certificate updated successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deleteCertificate = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const result = await collection().deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({
            message: "Certificate deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCertificate,
    getCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate
};