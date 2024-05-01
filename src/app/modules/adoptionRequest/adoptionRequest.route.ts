import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { adoptionRequestValidationSchema } from "./adoptionRequest.validation";
import { AdoptionRequestController } from "./adoptionRequest.controller";

const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
  validateRequest(adoptionRequestValidationSchema.createAdoptionRequestSchema),
  AdoptionRequestController.createAdoptionRequest
);

router.get(
  "/adoption-requests",
  auth(),
  AdoptionRequestController.getAllFromDB
);
router.put(
  "/adoption-requests/:requestId",
  auth(),
  validateRequest(adoptionRequestValidationSchema.updateAdoptionRequestSchema),
  AdoptionRequestController.updateAdoptionRequest
);

export const AdoptionRequestRoutes = router;
