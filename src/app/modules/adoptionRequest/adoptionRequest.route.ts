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

router.get("/adoption-requests", AdoptionRequestController.getAllFromDB);

export const AdoptionRequestRoutes = router;
