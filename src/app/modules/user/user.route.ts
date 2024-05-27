import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validations";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/users", UserController.getAllFromDB);

router.post(
  "/register",
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

router.get("/profile", auth(), UserController.getProfile);

router.put(
  "/profile",
  auth(),
  validateRequest(UserValidation.updateUser),
  UserController.updateProfile
);

router.patch(
  "/:id/status",
  auth(),
  validateRequest(UserValidation.updateStatus),
  UserController.changeProfileStatus
);

export const userRoutes = router;
