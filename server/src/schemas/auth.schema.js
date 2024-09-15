import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string({
    required_error: "Firstname is required",
  }),

  lastname: z.string({
    required_error: "Lastname is required",
  }),

  username: z.string({
    required_error: "Username is required",
  }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),

  role: z.string({
    required_error: "Role is required",
  }),
  permissions: z.array(z.string()),

  status: z.string({
    required_error: "Status is required",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});
