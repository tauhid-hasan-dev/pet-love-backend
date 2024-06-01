import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { petValidationSchema } from "./pet.validation";
import { PetController } from "./pet.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/pets",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(petValidationSchema.createPetSchema),
  PetController.createPet
);

router.get("/pets", PetController.getAllFromDB);

router.put(
  "/pets/:petId",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(petValidationSchema.updatePetSchema),
  PetController.updatePet
);

router.get("/pets/:petId", PetController.getSinglePet);

router.delete(
  "/pets/:petId",
  auth(ENUM_USER_ROLE.ADMIN),
  PetController.deleteFromDB
);

export const PetRoutes = router;
