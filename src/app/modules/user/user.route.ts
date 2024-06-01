import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validations";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

router.post(
  "/register",
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

router.get(
  "/profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.getProfile
);

router.put(
  "/profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(UserValidation.updateUser),
  UserController.updateProfile
);

router.patch(
  "/:id/status",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateStatus),
  UserController.changeProfileStatus
);

router.patch(
  "/:id/role",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateRole),
  UserController.updateRole
);

router.get(
  "/user/:userId",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteFromDB
);

export const userRoutes = router;
