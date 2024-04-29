import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validations";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

router.get("/profile", auth(), UserController.getProfile);

router.patch("/profile", auth(), UserController.updateProfile);

export const userRoutes = router;
