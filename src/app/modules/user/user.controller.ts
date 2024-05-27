import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.services";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getProfile(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateProfile(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile updated successfully",
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully!",
    data: result,
  });
});

const updateRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.updateRole(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully!",
    data: result,
  });
});

export const UserController = {
  createUser,
  getProfile,
  updateProfile,
  getAllFromDB,
  changeProfileStatus,
  updateRole,
};
