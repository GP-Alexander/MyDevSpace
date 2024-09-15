import { z } from 'zod';

// Esquema de validación para los proyectos
export const projectSchema = z.object({
  title: z.string({
    required_error: "Title is required"
  }).trim(),
  
  description: z.string({
    required_error: "Description is required"
  }).trim(),
  
  technologies: z.array(z.string(), {
    required_error: "Technologies are required"
  }).nonempty("At least one technology is required"),
  
  githubUrl: z.string({
    required_error: "GitHub URL is required"
  }).url("GitHub URL must be a valid URL").trim(),
  
  liveUrl: z.string({
    required_error: "Live URL is required"
  }).url("Live URL must be a valid URL").trim(),
  
  images: z.array(z.string().url("Each image URL must be valid")).optional().default([]),
  
  date: z.preprocess((arg) => {
    // Si es una cadena, conviértela a una fecha
    return typeof arg === 'string' ? new Date(arg) : arg;
  }, z.date({
    required_error: "Date is required"
  })),
  
  tags: z.array(z.string()).optional().default([]),
  
  highlights: z.array(z.string()).optional().default([])
});

// Esquema de validación para actualizar proyectos
export const updateProjectSchema = z.object({
    title: z.string().optional().trim(),
    description: z.string().optional().trim(),
    technologies: z.array(z.string()).optional(),
    githubUrl: z.string().url().optional().trim(),
    liveUrl: z.string().url().optional().trim(),
    images: z.array(z.string().url()).optional(),
    date: z.preprocess((arg) => {
        // Si es una cadena, conviértela a una fecha
        return typeof arg === 'string' ? new Date(arg) : arg;
    }, z.date()).optional(),
    tags: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional()
    });

    