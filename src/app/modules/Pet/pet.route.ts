import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { petValidationSchema } from "./pet.validation";
import { PetController } from "./pet.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/pets",
  auth(),
  validateRequest(petValidationSchema.createPetSchema),
  PetController.createPet
);

router.get("/pets", PetController.getAllFromDB);

export const PetRoutes = router;
