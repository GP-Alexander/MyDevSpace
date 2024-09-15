import { z } from 'zod';

// Esquema de validación para habilidades
export const skillsSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }).trim(),
  
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Level is required"
  }),
  
  category: z.string({
    required_error: "Category is required"
  }).trim()
});

export const updateSkillsSchema = z.object({
    name: z.string().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    category: z.string().optional()
    });