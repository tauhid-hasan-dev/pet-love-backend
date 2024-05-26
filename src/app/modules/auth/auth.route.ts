import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/change-password",
  auth(),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
