import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { Secret } from "jsonwebtoken";

import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      console.log(verifiedUser);

      req.user = verifiedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
