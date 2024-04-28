import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdoptionRequestServices } from "./adoptionRequest.services";
import pick from "../../../shared/pick";
import { petFilterableFields } from "./adoptionRequest.constant";

const createAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdoptionRequestServices.createAdoptionRequest(req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdoptionRequestServices.getAllFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Adoption requests retrieved successfully",
      data: result.result,
    });
  }
);

export const AdoptionRequestController = {
  createAdoptionRequest,
  getAllFromDB,
};
