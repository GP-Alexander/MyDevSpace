import { z } from 'zod';

const datePreprocess = z.preprocess((arg) => {
  // Intenta convertir el valor en un objeto Date si es una cadena
  return typeof arg === 'string' ? new Date(arg) : arg;
}, z.date({
  required_error: "This field must be a valid date"
}));

export const createExperienceSchema = z.object({
  company: z.string({
    required_error: "Company is required"
  }),
  position: z.string({
    required_error: "Position is required"
  }),
  location: z.string({
    required_error: "Location is required"
  }),
  startDate: datePreprocess,  // Usamos preprocess para convertir la fecha
  endDate: datePreprocess,    // Igual para endDate
  description: z.string({
    required_error: "Description is required"
  }),
});

export const updateExperienceSchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  startDate: datePreprocess.optional(),
  endDate: datePreprocess.optional(),
  description: z.string().optional(),
});
