import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validations";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

export const userRoutes = router;
