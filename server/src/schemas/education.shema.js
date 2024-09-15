import { z } from 'zod';

export const createEducacionSchema = z.object({
    institution: z.string({
        required_error: "Institution is required"
    }),
    degree: z.string({
        required_error: "Degree is required"
    }),
    fieldOfStudy: z.string({
        required_error: "Field of study is required"
    }),
    startDate: z.date({
        required_error: "Start date is required"
    }),
    endDate: z.date({
        required_error: "End date is required"
    }),
    description: z.string({
        required_error: "Description is required"
    })
});

export const updateEducationSchema = z.object({
    institution: z.string().optional(),
    degree: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    description: z.string().optional()
});