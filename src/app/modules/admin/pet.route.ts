import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { petValidationSchema } from "./pet.validation";
import { PetController } from "./pet.controller";

const router = express.Router();

router.post(
  "/pets",
  validateRequest(petValidationSchema.createPetSchema),
  PetController.createPet
);

export const PetRoutes = router;
