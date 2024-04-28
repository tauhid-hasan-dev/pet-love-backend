import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PetRoutes } from "../modules/pet/pet.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: PetRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
