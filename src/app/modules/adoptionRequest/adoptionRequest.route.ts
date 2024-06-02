import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { adoptionRequestValidationSchema } from "./adoptionRequest.validation";
import { AdoptionRequestController } from "./adoptionRequest.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/adoption-request",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(adoptionRequestValidationSchema.createAdoptionRequestSchema),
  AdoptionRequestController.createAdoptionRequest
);

router.get(
  "/adoption-requests",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AdoptionRequestController.getAllFromDB
);
router.put(
  "/adoption-requests/:requestId",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(adoptionRequestValidationSchema.updateAdoptionRequestSchema),
  AdoptionRequestController.updateAdoptionRequest
);

router.get(
  "/pending-adoption-requests/:userId",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AdoptionRequestController.getAllPendingRequests
);

router.get(
  "/adopted-pets/:userId",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AdoptionRequestController.getAllAdoptedPets
);

export const AdoptionRequestRoutes = router;
