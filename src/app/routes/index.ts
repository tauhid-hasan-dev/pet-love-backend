import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PetRoutes } from "../modules/pet/pet.route";
import { AdoptionRequestRoutes } from "../modules/adoptionRequest/adoptionRequest.route";

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
  {
    path: "/",
    route: AdoptionRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
