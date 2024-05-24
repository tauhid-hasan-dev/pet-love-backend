import { z } from "zod";

const createPetSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    type: z.string({
      required_error: "Type is required!",
    }),
    breed: z.string({
      required_error: "Breed is required!",
    }),
    age: z.number({
      required_error: "Age is required!",
    }),
    size: z.string({
      required_error: "Size is required!",
    }),
    location: z.string({
      required_error: "Location is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    temperament: z.string({
      required_error: "Temperament is required!",
    }),
    healthStatus: z.string({
      required_error: "Health status is required!",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption requirements are required!",
    }),
  }),
});

const updatePetSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    breed: z.string().optional(),
    age: z.number().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    healthStatus: z.string().optional(),
    adoptionRequirements: z.string().optional(),
  }),
});

export const petValidationSchema = {
  createPetSchema,
  updatePetSchema,
};
