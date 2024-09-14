import certificationsService from "../models/certifications.model.js";

export const createCertification = async (req, res) => {
    try {
        const {
            name,
            issuingOrganization,
            issueDate,
            expirationDate,
            credentialID,
            credentialURL,
        } = req.body;

        const newCertification = new certificationsService({
            name,
            issuingOrganization,
            issueDate,
            expirationDate,
            credentialID,
            credentialURL,
        });

        const certificationSaved = await newCertification.save();
        res.status(201).json(certificationSaved);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCertifications = async (req, res) => {
    try {
        const certifications = await certificationsService.find();
        res.json(certifications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const certification = await certificationsService.findById(id);

        if (!certification) {
            return res.status(404).json({ message: `Certification with id ${id} not found` });
        }

        res.json(certification);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateCertification = async (req, res) => {
    try {
        const {
            name,
            issuingOrganization,
            issueDate,
            expirationDate,
            credentialID,
            credentialURL,
        } = req.body;

        const certificationUpdated = await certificationsService.findOneAndUpdate(
            { _id: req.params.id },
            {
                name,
                issuingOrganization,
                issueDate,
                expirationDate,
                credentialID,
                credentialURL,
            },
            { new: true }
        );

        if (!certificationUpdated) {
            return res.status(404).json({ message: `Certification with id ${req.params.id} not found` });
        }

        res.json(certificationUpdated);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCertification = await certificationsService.findByIdAndDelete(id);

        if (!deletedCertification) {
            return res.status(404).json({ message: `Certification with id ${id} not found` });
        }

        res.json({ message: `Certification ${id} deleted` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
