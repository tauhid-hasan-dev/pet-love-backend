import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "BLOCKED"]),
  }),
});

const updateRole = z.object({
  body: z.object({
    role: z.enum(["ADMIN", "USER"]),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
  updateStatus,
  updateRole,
};
