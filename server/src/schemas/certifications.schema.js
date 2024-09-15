import { z } from "zod";

export const createCertificationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    issuingOrganization: z.string({
        required_error: "Issuing Organization is required",
    }),
    issueDate: z.date({ required_error: "Issue Date is required" }),
    expirationDate: z.date({ required_error: "Expiration Date is required" }),
    credentialID: z.string({
        required_error: "Credential ID is required",
    }),
    credentialURL: z.string({
        required_error: "Credential URL is required",
    }),
});

export const updateCertificationSchema = z.object({
    name: z.string().optional(),
    issuingOrganization: z.string().optional(),
    issueDate: z.date().optional(),
    expirationDate: z.date().optional(),
    credentialID: z.string().optional(),
    credentialURL: z.string().optional(),
});

