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
    // console.log(req.query)
    const filters = pick(req.query, petFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdoptionRequestServices.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Pets retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AdoptionRequestController = {
  createAdoptionRequest,
  getAllFromDB,
};
