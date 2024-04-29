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

export const UserValidation = {
  createUser,
  updateUser
};
