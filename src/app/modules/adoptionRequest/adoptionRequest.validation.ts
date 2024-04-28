import { z } from "zod";

const createAdoptionRequestSchema = z.object({
  body: z.object({
    petId: z.string({
      required_error: "Name is required!",
    }),
    petOwnershipExperience: z.string({
      required_error: "petOwnershipExperience is required!",
    }),
  }),
});

export const adoptionRequestValidationSchema = {
  createAdoptionRequestSchema,
};
