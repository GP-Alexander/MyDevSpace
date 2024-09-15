import {z} from 'zod';

export const createContactSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    message: z.string({
        required_error: "Message is required"
    })
});

export const updateContactSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    message: z.string().optional()
});

