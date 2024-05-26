import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.services";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log({ user });
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully!",
    data: {
      status: 200,
      message: "Password changed successfully!",
    },
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
